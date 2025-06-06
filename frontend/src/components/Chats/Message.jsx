/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Reply } from "lucide-react";
import React, { useMemo, useRef, useState } from "react";
import { useUserContext } from "../../context/userContext";
import { motion, useInView } from "framer-motion";
// there are two id one is for message id and one is sender id which tells the senders id
export const Message = React.forwardRef(
	({ message, highlightedMsgId, handleReplyScroll, reply }, ref) => {
		const { fingerprint } = useUserContext();

		const getChatDirection = () => {
			if (message?.senderId === fingerprint) {
				return "justify-end";
			} else {
				return "justify-start";
			}
		};
		function isLink() {
			const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/i;
			return urlRegex.test(message.message);
		}
		const Tag = isLink() ? "a" : "span";
		const isSendByMe = message.senderId === fingerprint;
		// for motion js used chatpgt idk motion
		const localRef = useRef(null);
		const isInView = useInView(localRef, { once: true });

		const replyHandleClick = () => {
			reply.setReplyTo({
				reply: {
					message: message.message,
					name: message.name,
					userId: message.senderId,
				},
				chatRefId: message.id,
			});
		};

		// all functions to handle big messages
		const totalLines = useMemo(() => {
			const lines = message.message.split("\n").length;
			return lines;
		}, [message]);
		const [visibleLines, setVisibleLines] = useState(20);
		const isTruncated = totalLines > visibleLines;

		return (
			<motion.div
				ref={(el) => {
					localRef.current = el;
					ref(el);
				}}
				initial={{ opacity: 0, y: 10 }}
				animate={isInView ? { opacity: 1, y: 0 } : {}}
				transition={{ duration: 0.3 }}
				className={`flex items-center w-full text-gray-200 p-2 relative ${getChatDirection()} gap-1 md:gap-3 ${
					highlightedMsgId === message.id
						? "bg-gray-700 rounded-md p-2"
						: ""
				} transition-all duration-800`}
			>
				{/* is sended by me then it does not show the avatar */}
				{!isSendByMe && (
					<img
						src={`https://api.dicebear.com/9.x/big-ears/svg?seed=${
							message.name || "User"
						}`}
						className="w-8 h-8 rounded-full object-center"
					/>
				)}

				{/* Message Content */}
				<div className="bg-gray-900 px-2 py-1 rounded-lg max-w-xs xl:max-w-xl">
					{/* if send by me then it will show the name as You */}
					{!isSendByMe && (
						<span
							className={` text-green-500 font-semibold leading-none text-xs`}
						>
							{message.name}
						</span>
					)}

					{/* chat ke upar reply wala dikhega isse */}
					{message?.replyTo?.chatRefId && (
						<div
							className="flex flex-col line-clamp-3 p-2 rounded-md bg-gray-700 border-l-green-500 border-l-4 cursor-pointer"
							onClick={() =>
								handleReplyScroll(message.replyTo.chatRefId)
							}
						>
							<span className="text-gray-400 text-xs">
								~{" "}
								{message.replyTo.userId === fingerprint
									? "You"
									: message.replyTo.name || "User"}
							</span>
							<span className="text-sm max-h-10 overflow-hidden whitespace-pre-line">
								{message.replyTo.message}
							</span>
						</div>
					)}

					{/* message content */}
					<Tag
						className={`whitespace-pre-line block ${
							isLink()
								? "text-sky-500 cursor-pointer hover:underline"
								: ""
						}`}
						href={isLink() ? message.message : undefined}
						target="_blank"
					>
						{message.message
							.split("\n")
							.slice(0, visibleLines)
							.join("\n")}
					</Tag>
					{isTruncated && (
						<span
							className="text-gray-500 cursor-pointer "
							onClick={() => setVisibleLines((prev) => prev + 20)}
						>
							.... <br />
							<span className="hover:underline text-sky-500">
								Read More
							</span>
						</span>
					)}
					<p className="text-gray-500  text-xs text-end pt-0.5">
						{getTime(message.timestamp)}
					</p>
				</div>

				{/* reply button */}
				<div
					className="hover:bg-gray-700 rounded-full p-1 cursor-pointer"
					onClick={replyHandleClick}
				>
					<Reply size={20} />
				</div>
			</motion.div>
		);
	}
);

const getTime = (timestamp) => {
	const date = new Date(timestamp);
	return date.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
};

const randomColor = () => {
	const colors = [
		"red",
		"slate",
		"amber",
		"zinc",
		"green",
		"gray",
		"fuchsia",
		"stone",
		"lime",
		"neutral",
		"purple",
		"cyan",
		"rose",
		"indigo",
		"orange",
		"teal",
		"pink",
		"sky",
		"emerald",
		"blue",
		"violet",
		"yellow",
	];

	return "text-" + colors[Math.floor(Math.random() * colors.length)] + "-500";
};
