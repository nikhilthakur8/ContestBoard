/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import {
	ArrowLeft,
	ExternalLinkIcon,
	SendHorizontalIcon,
	X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import {
	getAllMessages,
	readRecentMessage,
	sendMessage,
} from "../../Firebase/chat";
import { getDiscussionById } from "../../appwrite/discussion";
import { images } from "../../service/platformImg";
export const ChatPage = () => {
	// Device Fingerprint
	const { fingerprint } = useUserContext();
	// Navigation Data
	const navigate = useNavigate();
	const { roomId } = useParams();
	const bottomRef = useRef(null);
	const inputRef = useRef(null);
	const chatRef = useRef({}); // keep track of all chat references
	const [roomData, setRoomData] = useState(null);
	// User Name
	const [name, setName] = useState(localStorage.getItem("name") || "User");

	// Chat Messages
	const [messages, setMessages] = useState([]);
	const [highlightedMsgId, setHighlightedMsgId] = useState(null);
	const [replyTo, setReplyTo] = useState({
		reply: {
			message: null,
			name: null,
		},
		chatRefId: null,
	});
	useEffect(() => {
		if (!roomId) {
			return navigate("/discussion");
		} else {
			getDiscussionById(roomId).then((discussion) => {
				if (!discussion) {
					return navigate("/discussion");
				}
				setRoomData(discussion);
				document.title = `Discussion Room - ${discussion.name}`;
			});
		}
	}, []);
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape") {
				setReplyTo({
					reply: { message: null, name: null },
					chatRefId: null,
				});
			}
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				inputRef.current.form.requestSubmit();
			}
			if (
				e.target.tagName !== "TEXTAREA" &&
				e.key.length === 1 &&
				!e.ctrlKey &&
				!e.metaKey &&
				!e.altKey
			) {
				inputRef.current?.focus();
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	useEffect(() => {
		// when new message is added, scroll to the bottom
		if (bottomRef.current) {
			bottomRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	useEffect(() => {
		// take name of user
		if (!localStorage.getItem("name")) {
			const enteredName = prompt("Enter your name");
			if (enteredName) {
				setName(enteredName);
				localStorage.setItem("name", enteredName);
			} else {
				navigate("/discussion");
				return;
			}
		}
		// fetch all the messages
		getAllMessages(roomId, (messages) => {
			setMessages(messages);
		});
		// subscribe to new messages
		const unsubscribe = readRecentMessage(roomId, (data) => {
			setMessages((prevMessages) => [...prevMessages, data]);
		});

		return () => {
			unsubscribe();
		};
	}, [roomId]);

	// hanlde the message submission
	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		const message = form.message.value;
		if (!message) return;

		const newMessage = {
			senderId: fingerprint,
			message,
			name,
			replyTo: {
				message: replyTo.reply.message,
				name: replyTo.reply.name,
				chatRefId: replyTo.chatRefId,
			},
			timestamp: new Date().toISOString(),
		};
		sendMessage(roomId, newMessage);
		form.reset();
		setReplyTo({
			reply: { message: null, name: null },
			chatRefId: null,
		});
		e.target.message.style.height = "auto";
	};
	const handleReplyScroll = (messageId) => {
		setHighlightedMsgId(messageId);
		setTimeout(() => {
			setHighlightedMsgId(null);
		}, 800);
		chatRef.current[messageId]?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	};
	return (
		<div className="h-screen">
			<div className=" flex flex-col h-full bg-gray-800  text-gray-300  overflow-hidden">
				{/* chat header */}
				<ChatHeader name={name} roomData={roomData} />
				{/* chat messages */}
				<ChatMessage
					messages={messages}
					highlightedMsgId={highlightedMsgId}
					setHighlightedMsgId={setHighlightedMsgId}
					replyTo={replyTo}
					setReplyTo={setReplyTo}
					handleReplyScroll={handleReplyScroll}
					ref={chatRef}
					bottomRef={bottomRef}
					chatRef={chatRef}
				/>
				{/* chat input */}
				<ChatInput
					handleSubmit={handleSubmit}
					inputRef={inputRef}
					replyTo={replyTo}
					setReplyTo={setReplyTo}
				/>
			</div>
		</div>
	);
};

function ChatHeader({ roomData }) {
	const navigate = useNavigate();
	return (
		<div className="px-5 flex items-center gap-4 py-3 bg-gray-950">
			<button
				className="cursor-pointer hover:bg-gray-800 border hover:border-gray-700 border-transparent rounded-full p-1"
				title="Back to Discussion"
				onClick={() => window.history.back() || navigate("/discussion")}
			>
				<ArrowLeft />
			</button>
			<div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-700 border border-gray-600">
				<img
					src={
						images[roomData?.platform] ||
						"https://api.dicebear.com/7.x/pixel-art/svg?seed=happyuser"
					}
					alt="platform logo"
					className="w-8 h-8 rounded-full object-contain "
				/>
			</div>
			<span className="text-lg font-semibold">{roomData?.name}</span>
			<ExternalLinkIcon
				className="text-sky-500 size-6 transition hover:scale-120 hover:text-sky-400 cursor-pointer"
				onClick={() => window.open(roomData.link, "_blank")}
				title="Go to Contest Link"
			/>
		</div>
	);
}

function ChatMessage({
	messages,
	highlightedMsgId,
	replyTo,
	setReplyTo,
	handleReplyScroll,
	bottomRef,
	chatRef,
}) {
	return (
		<div className="overflow-y-auto  scrollbar-hide h-full  py-5">
			<div className="flex flex-col px-5">
				{messages.map((message) => (
					<Message
						key={message.id}
						message={message}
						ref={(el) => (chatRef.current[message?.id] = el)}
						highlightedMsgId={highlightedMsgId}
						handleReplyScroll={handleReplyScroll}
						reply={{ replyTo, setReplyTo }}
					/>
				))}
				<div ref={bottomRef} />
			</div>
		</div>
	);
}

function ChatInput({ handleSubmit, inputRef, replyTo, setReplyTo }) {
	return (
		<div className="w-full text-lg flex  flex-col border-t border-gray-700">
			{replyTo.chatRefId && (
				<div className="flex items-center justify-between rounded-t-md bg-gray-700">
					<div className="px-5 py-1  max-h-20 overflow-hidden text-sm w-full">
						<p className="text-gray-500 text-xs">
							~ {replyTo.reply.name || "User"}
						</p>
						<p className="whitespace-pre-line">
							{replyTo.reply.message}
						</p>
					</div>
					<X
						className="mx-8 h-full hover:bg-gray-500 px-2 size-10 rounded-md"
						onClick={() =>
							setReplyTo({
								reply: { message: null, name: null },
								chatRefId: null,
							})
						}
					/>
				</div>
			)}
			<div className="w-full">
				<form
					onSubmit={handleSubmit}
					className="text-lg inline-flex w-full"
				>
					<textarea
						placeholder="Type message..."
						ref={inputRef}
						autoFocus
						rows={1}
						spellCheck={"false"}
						name={"message"}
						className="w-full px-5 py-3 h-auto max-h-32 leading-snug resize-none overflow-y-auto outline-none  break-words scrollbar-hide "
						onInput={(e) => {
							e.target.style.height = "auto";
							const scrollHeight = e.target.scrollHeight;
							const maxHeight = 130;
							e.target.style.height =
								Math.min(scrollHeight, maxHeight) + "px";
						}}
					/>
					<button
						className="rounded-full px-10 cursor-pointer"
						type="submit"
					>
						<SendHorizontalIcon />
					</button>
				</form>
			</div>
		</div>
	);
}
