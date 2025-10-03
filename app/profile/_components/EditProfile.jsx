'use client'

import { useUser } from "@/app/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { useState } from "react"

export default function EditProfile({ onClose }) {
    const [loading, setLoading] = useState(false);
    const user = useUser();
    const [data, setData] = useState({
        fullName: user?.fullName || '',
        email: user?.email || ''
    });

    function handleUpdate() {
        setLoading(true);
        try {
            fetch(`/api/profile`, {
                method: "POST",
                body: JSON.stringify({
                    fullName: data.fullName
                }),
            })
                .then(async (response) => {
                    if (!response.ok) {
                        const res = await response.json();
                        setError(res.error || "Cập nhật thất bại");
                        return;
                    }
                    onClose();
                    window.location.href = '/profile';
                })
                .catch((error) => {
                    console.error("Đã xảy ra lỗi:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (err) {
            setError(err.errors?.[0]?.message || "Cập nhật thất bại");
        }
    }

    return <AnimatePresence>
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
                        <div className={'text-[#2F3C30] font-semibold text-[24px] mb-6'}>Thay đổi thông tin
                        </div>
                        <div className={'space-y-5'}>
                            <div className="flex items-center gap-5 justify-center">
                                <img
                                    className="w-[106px] h-[106px]"
                                    alt="Avatar"
                                    src={'/ellipse-1.svg'}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-xs text-[#6B5B4A] mb-1.5 font-medium">Họ và tên<span className="text-red-500"> *</span></label>
                                <Input
                                    onChange={e => setData({
                                        ...data,
                                        fullName: e.target.value
                                    })}
                                    value={data.fullName}
                                    className="w-full text-black border-gray-200 bg-white appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-xs text-[#6B5B4A] mb-1.5 font-medium">Email</label>
                                <Input
                                    value={data.email}
                                    className="border border-[#E5E5E5] bg-[#E9E9E9] text-black focus:border-[#B6F09C] focus:ring-[#B6F09C]/20 rounded-xl h-10"
                                    required
                                    disabled
                                />
                            </div>
                            <Button
                                disabled={loading || !data.fullName}
                                onClick={handleUpdate}
                                className="cursor-pointer flex-1 h-12 rounded-full bg-[#B5ED76] hover:bg-[#16A34A] text-black text-base w-full shadow-none"
                            >{loading && <Loader2 className="animate-spin w-5 h-5" />} Cập nhật</Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    </AnimatePresence>
}