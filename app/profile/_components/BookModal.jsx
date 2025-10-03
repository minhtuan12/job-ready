"use client";

import React from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Button} from "@/components/ui/button";
import {ChevronDownIcon, FileText, Upload, X,} from "lucide-react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Calendar} from "@/components/ui/calendar";

// Component modal thiết kế kịch bản phỏng vấn
const BookModal = (
    {
        name,
        avatar,
        company,
        show,
        onClose,
        logo
    }) => {
    const router = useRouter();
    const [isProceeding, setIsProceeding] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState({
        date: undefined,
        time: '00:00:00',
        cv: '',
        name: '',
        email: '',
        note: ''
    })

    const fileInputRef = React.useRef(null);

    const handleClick = () => {
        fileInputRef.current?.click(); // gọi click của input ẩn
    };

    const handleChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log("Đã chọn:", file.name);
        }
    };

    function handleBookHr() {
        console.log(data);
    }

    return (
        <AnimatePresence>
            {show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Nền mờ và hiệu ứng blur */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"/>
                    {/* Modal chính, có hiệu ứng động */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.97, y: 20}}
                        animate={{opacity: 1, scale: 1, y: 0}}
                        exit={{opacity: 0, scale: 0.97, y: 20}}
                        transition={{duration: 0.3, ease: 'easeOut'}}
                        className="relative w-full max-w-xl px-2 sm:px-0 flex flex-col items-center z-10 max-h-[90vh]"
                    >
                        {/* Nút đóng modal */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="absolute top-11 right-0 w-9 h-9 bg-white shadow-lg border border-gray-200 flex items-center justify-center rounded-r-full rounded-l-none z-40 hover:bg-gray-100 transition-all duration-150"
                            style={{boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)'}}
                            aria-label="Đóng"
                        >
                            <X className="w-12 h-12 text-[#2D221B]"/>
                        </Button>
                        <div
                            className="w-full max-w-lg h-full rounded-b-[36px] px-1 pb-1 flex flex-col items-center relative z-10"
                            style={{boxShadow: '0 8px 32px 0 rgba(75,55,46,0.12)'}}>
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
                                <div className={'text-[#2F3C30] font-semibold text-[24px] mb-6'}>Đặt lịch phỏng vấn
                                    1-1
                                </div>
                                <div className={'space-y-5'}>
                                    <div className="flex items-center gap-5">
                                        <div className={'relative'}>
                                            <Image
                                                src={avatar}
                                                alt={name}
                                                width={56}
                                                height={56}
                                                className="h-14 w-14 rounded-full object-cover"
                                            />
                                            <Image
                                                src={logo}
                                                alt={`logo`}
                                                width={24}
                                                height={24}
                                                className="h-6 w-6 rounded-full object-cover absolute bottom-0 -right-1 border border-white"
                                            />
                                        </div>
                                        <div className={'space-y-2'}>
                                            <p className="font-bold text-[18px] text-[#2F3C30]">{name}</p>
                                            <p className="text-[14px] text-[#607362]">Hr tại {company}</p>
                                        </div>
                                    </div>

                                    {/* Thời gian phòng vấn */}
                                    <div className="mb-4">
                                        <label className="block text-xs text-[#6B5B4A] mb-1.5 font-medium">Thời gian
                                            phỏng vấn<span className="text-red-500"> *</span></label>
                                        <div className={'flex gap-2'}>
                                            <Popover open={open} onOpenChange={setOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        id="date-picker"
                                                        className="w-1/2 justify-between font-normal bg-white text-black border-gray-200"
                                                    >
                                                        {data.date ? data.date.toLocaleDateString('vi-VN', {
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit'
                                                        }) : "DD/MM/YYYY"}
                                                        <ChevronDownIcon/>
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={data.date}
                                                        captionLayout="dropdown"
                                                        onSelect={(date) => {
                                                            setData({...data, date})
                                                            setOpen(false)
                                                        }}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <Input
                                                onChange={e => setData({
                                                    ...data,
                                                    time: e.target.value
                                                })}
                                                value={data.time}
                                                type="time"
                                                id="time-picker"
                                                step="1"
                                                className="w-1/2 text-black border-gray-200 bg-white appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-xs text-[#6B5B4A] mb-1.5 font-medium">Hình thức
                                            phỏng vấn</label>
                                        <Input
                                            value={"Google Meet"}
                                            className="border border-[#E5E5E5] bg-[#E9E9E9] text-black focus:border-[#B6F09C] focus:ring-[#B6F09C]/20 rounded-xl h-10"
                                            required
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-xs text-[#6B5B4A] mb-1.5 font-medium">CV<span
                                            className="text-red-500"> *</span></label>
                                        <div className={'flex gap-2'}>
                                            <div
                                                onClick={handleClick}
                                                className={'gap-2 flex items-center h-10 w-[111px] rounded-full border border text-black px-4 border-[#DBDBDB] cursor-pointer hover:bg-gray-100'}>
                                                <Upload className={'text-black w-4 h-4'}/>
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
                                                <FileText className={'text-black w-4 h-4'}/>
                                                Chọn từ thư viện
                                            </div>
                                        </div>
                                        <div className={'mt-2 text-[#607362] text-[14px]'}>Hỗ trợ định dạng .doc, .docx,
                                            .pdf
                                            có kích thước dưới 6MB
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-xs text-[#6B5B4A] mb-1.5 font-medium">Họ và tên bạn<span
                                            className="text-red-500"> *</span></label>
                                        <Input
                                            value={data.name}
                                            onChange={(e) => setData({...data, name: e.target.value})}
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
                                            onChange={(e) => setData({...data, email: e.target.value})}
                                            placeholder="Nhập email"
                                            className="border border-[#E5E5E5] bg-white text-[#2D221B] focus:border-[#B6F09C] focus:ring-[#B6F09C]/20 rounded-xl h-10"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-xs text-[#6B5B4A] mb-1.5 font-medium">Ghi chú cho
                                            HR</label>
                                        <Textarea
                                            placeholder="Nhập ghi chú"
                                            value={data.note}
                                            onChange={(e) => setData({...data, note: e.target.value})}
                                            className="min-h-[100px] bg-[#f3faf5] border border-[#E5E7EB] text-[#22372B] placeholder:text-[#B0B7A1] rounded-xl"
                                        />
                                    </div>

                                    <Button
                                        onClick={handleBookHr}
                                        className="flex-1 h-12 rounded-full bg-[#B5ED76] hover:bg-[#16A34A] text-black text-base w-full shadow-none"
                                    >Đặt lịch</Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    {/* Loading overlay khi chuyển sang phòng phỏng vấn */}
                    {isProceeding && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                            <div
                                className="flex flex-col items-center gap-4 bg-white/90 rounded-2xl px-8 py-10 shadow-2xl border border-gray-200">
                                <svg className="animate-spin h-10 w-10 text-green-500 mb-2"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                                <div className="text-lg font-semibold text-[#2D221B]">Đang chuyển sang phòng phỏng
                                    vấn...
                                </div>
                                <div className="text-sm text-gray-500">Vui lòng chờ trong giây lát</div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </AnimatePresence>
    );
};

export default BookModal;
