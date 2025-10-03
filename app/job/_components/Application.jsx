'use client'

import { useUser } from "@/app/context/UserContext"
import Congrats from "@/components/congrats"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, FileText, Loader2, Trash, Upload, X } from "lucide-react"
import React, { useState } from "react"

export default function Application({ selectedJob, onClose }) {
    const user = useUser()
    const [data, setData] = useState({
        fullName: user.fullName,
        email: user.email,
        cv: '',
        letter: ''
    })
    const fileInputRef = React.useRef(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleClick = () => {
        fileInputRef.current?.click(); // gọi click của input ẩn
    };

    const handleChange = (e) => {
        const file = e.target.files?.[0];
        setData(prev => ({ ...prev, cv: file }));
    };

    function handleApply() {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("fullName", data.fullName)
            formData.append("email", data.email)
            formData.append("cv", data.cv)
            formData.append("letter", data.letter)
            formData.append("jobId", selectedJob.id)
            fetch(`/api/job`, {
                method: "POST",
                body: formData,
            })
                .then(async (response) => {
                    const res = await response.json();
                    if (res.success) {
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
            setError(err.errors?.[0]?.message || "Gửi yêu cầu thất bại");
        }
    }

    return success ? <Congrats resend={false} setOpen={() => {
        setSuccess(false)
    }}>
        <div className="text-center mt-7">
            <h2 className="text-2xl font-semibold text-[#2f3c30]">
                Ứng tuyển thành công
            </h2>
            <p className="text-base text-[#607361] leading-6 mt-3">
                Chúc mừng bạn đã ứng tuyển thành công vào vị trí <b>{selectedJob.name}</b> tại <b>{selectedJob.company}</b>. Nhà tuyển dụng sẽ liên hệ lại với bạn trong thời gian sớm nhất.
            </p>
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
                        <div className={'text-[#2F3C30] font-semibold text-[24px] mb-6'}>Ứng tuyển {selectedJob.name}
                        </div>
                        <div className={'space-y-5'}>
                            <div className="mb-4">
                                <label className="block text-xs text-[#6B5B4A] mb-1.5 font-medium">Họ và tên<span className="text-red-500"> *</span></label>
                                <Input
                                    onChange={e => setData({
                                        ...data,
                                        fullName: e.target.value
                                    })}
                                    required
                                    value={data.fullName}
                                    className="w-full text-black border-gray-200 bg-white appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-xs text-[#6B5B4A] mb-1.5 font-medium">Email</label>
                                <Input
                                    value={data.email}
                                    className="border border-[#E5E5E5] bg-white text-black focus:border-[#B6F09C] focus:ring-[#B6F09C]/20 rounded-xl h-10"
                                    required
                                    onChange={e => setData({
                                        ...data,
                                        email: e.target.value
                                    })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-xs text-[#6B5B4A] mb-1.5 font-medium">CV<span
                                    className="text-red-500"> *</span></label>
                                <div className={'flex gap-2'}>
                                    {
                                        !data.cv ? <>
                                            <div
                                                onClick={handleClick}
                                                className={'gap-2 flex items-center h-10 w-[111px] rounded-full border border text-black px-4 border-[#DBDBDB] cursor-pointer hover:bg-gray-100'}>
                                                <Upload className={'text-black w-4 h-4'} />
                                                Tải lên
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    className="hidden"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div
                                                className={'gap-2 flex items-center h-10 w-auto rounded-full border border text-black px-4 border-[#DBDBDB] cursor-pointer hover:bg-gray-100'}>
                                                <FileText className={'text-black w-4 h-4'} />
                                                Chọn từ thư viện
                                            </div>
                                        </> : <div className="flex items-center gap-3">
                                            <div className="flex gap-2 w-[308px] h-10 px-5 rounded-full items-center border border-[#B5ED76] bg-[#F8FEF2] text-[#629726] text-[14px] font-medium">
                                                <FileText className={'text-[#629726] w-4 h-4'} />
                                                <p className="max-w-[80%] line-clamp-1 text-ellipsis overflow-hidden">{data.cv?.name || ''}</p>
                                                <ArrowUpRight className="w-5 h-5 text-[#629726] ml-2" />
                                            </div>
                                            <Trash onClick={() => { setData(prev => ({ ...prev, cv: '' })) }} className="text-red-500 cursor-pointer w-5 h-5" />
                                        </div>
                                    }
                                </div>
                                <div className={'mt-2 text-[#607362] text-[14px]'}>Hỗ trợ định dạng .doc, .docx,
                                    .pdf
                                    có kích thước dưới 6MB
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-xs text-[#6B5B4A] mb-1.5 font-medium">Thư giới thiệu</label>
                                <Textarea
                                    placeholder="Một thư giới thiệu chỉn chu sẽ giúp bạn trở nên chuyên nghiệp trong mắt nhà tuyển dụng"
                                    value={data.letter}
                                    className="border border-[#E5E5E5] bg-white text-black focus:border-[#B6F09C] focus:ring-[#B6F09C]/20 rounded-xl h-10"
                                    required
                                    onChange={e => setData({
                                        ...data,
                                        letter: e.target.value
                                    })}
                                />
                            </div>
                            <Button
                                disabled={loading || !data.fullName || !data.email || !data.cv}
                                onClick={handleApply}
                                className="cursor-pointer flex-1 h-12 rounded-full bg-[#B5ED76] hover:bg-[#16A34A] text-black text-base w-full shadow-none"
                            >{loading && <Loader2 className="animate-spin w-5 h-5" />} Nộp hồ sơ</Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    </AnimatePresence>
}
