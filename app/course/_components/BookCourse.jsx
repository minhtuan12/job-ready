"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDownIcon, FileText, Loader2, Trash, Upload, X, } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Congrats from "@/components/congrats";
import { useUser } from "@/app/context/UserContext";

const BookCourse = (
    {
        name,
        description,
        startTime,
        trainer,
        onClose,
        thumbnail,
    }) => {
    const user = useUser();
    const [data, setData] = React.useState({
        fullName: user.fullName,
        email: user.email,
        question: ''
    })
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    function handleBookHr() {
        setLoading(true);
        try {
            fetch(`/api/course`, {
                method: "POST",
                body: JSON.stringify({ ...data }),
            })
                .then(async (response) => {
                    if (!response.ok) {
                        toast.error('Đã xảy ra lỗi')
                    } else {
                        setSuccess(true);
                    }
                })
                .catch((error) => {
                    console.error("Đã xảy ra lỗi:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (err) {
            setError(err.errors?.[0]?.message || "Đăng ký thất bại");
        }
    }

    return (
        success ? <Congrats setOpen={() => {
            setSuccess(false)
        }}>
            <div className="text-center mt-7">
                <h2 className="text-2xl font-semibold text-[#2f3c30]">
                    Đăng ký tham gia thành công
                </h2>
                <p className="text-base text-[#607361] leading-6 mt-3">
                    Link tham gia buổi Workshop đã được gửi đến <b>{data.email}</b>. Chúc bạn sẽ có một buổi workshop hiệu quả và học được nhiều kiến thức mới.
                </p>
            </div>

            <div className="flex gap-5 w-full my-6">
                <div className="flex flex-col gap-[10px]">
                    <p className="text-[#2F3C30] text-[18px] font-bold">{name}</p>
                    <p className="text-[#607362] text-[14px]">{description}</p>
                </div>
                <img src={thumbnail} />
            </div>

            <div className="w-full flex flex-col gap-">
                <div className="flex justify-between text-base text-[#607361]">
                    <span>Ngày bắt đầu</span>
                    <span className="text-[#2f3c30] font-bold">
                        {startTime}
                    </span>
                </div>
                <div className="h-px w-full bg-[#EBEBEB] my-4" />
                <div className="flex justify-between text-base text-[#607361]">
                    <span>Trainer</span>
                    <span className="text-[#2f3c30] font-bold">{trainer}</span>
                </div>
                <div className="h-px w-full bg-[#EBEBEB] my-4" />
                <div className="flex justify-between text-base text-[#607361]">
                    <span>Hình thức</span>
                    <span className="text-[#2f3c30] font-bold">Online qua Zoom</span>
                </div>
                <div className="h-px w-full bg-[#EBEBEB] my-4" />
            </div>
        </Congrats> : <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* Nền mờ và hiệu ứng blur */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />
                {/* Modal chính, có hiệu ứng động */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.97, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: 20 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="relative w-full max-w-xl px-2 sm:px-0 flex flex-col items-center z-10 max-h-[90vh]"
                >
                    {/* Nút đóng modal */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="absolute top-11 right-0 w-9 h-9 bg-white shadow-lg border border-gray-200 flex items-center justify-center rounded-r-full rounded-l-none z-40 hover:bg-gray-100 transition-all duration-150"
                        style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}
                        aria-label="Đóng"
                    >
                        <X className="w-12 h-12 text-[#2D221B]" />
                    </Button>
                    <div
                        className="w-full max-w-lg h-full rounded-b-[36px] px-1 pb-1 flex flex-col items-center relative z-10"
                        style={{ boxShadow: '0 8px 32px 0 rgba(75,55,46,0.12)' }}>
                        {/* Lớp trắng phía trước (nội dung chính) */}
                        <div
                            className="relative z-20 w-full max-w-lg p-6 mx-auto rounded-[20px] bg-white flex flex-col overflow-hidden border border-transparent shadow-2xl"
                            style={{
                                maxHeight: 'calc(90vh - 120px)', // Trừ chiều cao header
                                overflowY: 'auto',
                                scrollbarWidth: 'thin',
                                scrollbarColor: '#E5D6C6 #FFFFFF'
                            }}
                        >
                            {/* Nội dung chính của modal */}
                            <div className={'text-[#2F3C30] font-semibold text-[24px] mb-6'}>Đăng ký tham gia khóa học
                            </div>
                            <div className={'space-y-5'}>

                                <div className="mb-4">
                                    <label className="block text-xs text-[#6B5B4A] mb-1.5 font-medium">Họ và tên bạn<span
                                        className="text-red-500"> *</span></label>
                                    <Input
                                        value={data.name}
                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                        placeholder="Nhập họ và tên"
                                        className="border border-[#E5E5E5] bg-white text-[#2D221B] focus:border-[#B6F09C] focus:ring-[#B6F09C]/20 rounded-xl h-10"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-xs text-[#6B5B4A] mb-1.5 font-medium">Email nhận
                                        link phỏng vấn<span className="text-red-500"> *</span></label>
                                    <Input
                                        value={data.email}
                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                        placeholder="Nhập email"
                                        className="border border-[#E5E5E5] bg-white text-[#2D221B] focus:border-[#B6F09C] focus:ring-[#B6F09C]/20 rounded-xl h-10"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-xs text-[#6B5B4A] mb-1.5 font-medium">câu hỏi cho giảng viên</label>
                                    <Textarea
                                        placeholder="Nhập câu hỏi"
                                        value={data.note}
                                        onChange={(e) => setData({ ...data, question: e.target.value })}
                                        className="min-h-[100px] bg-[#f3faf5] border border-[#E5E7EB] text-[#22372B] placeholder:text-[#B0B7A1] rounded-xl"
                                    />
                                </div>

                                <Button
                                    disabled={loading || !data.fullName || !data.email}
                                    onClick={handleBookHr}
                                    className="cursor-pointer flex-1 h-12 rounded-full bg-[#B5ED76] hover:bg-[#16A34A] text-black text-base w-full shadow-none"
                                >{loading && <Loader2 className="animate-spin w-5 h-5" />} Đăng ký</Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default BookCourse;
