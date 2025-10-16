"use client";

import React, { use, useState } from "react";
import { Calendar, ChevronLeft, Loader2, Pencil, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { courses, filters, softSkills } from "@/utils/constants";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Congrats from "@/components/congrats";
import { useUser } from "@/app/context/UserContext";

export default function ({ params }) {
    const router = useRouter();
    const { id } = use(params);
    const course = softSkills.find(i => i.id === Number(id));
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState({
        name: '',
        email: '',
        question: ''
    })
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const user = useUser();

    function handleRegisterCourse() {
        setLoading(true);
        try {
            fetch(`/api/course-register`, {
                method: "POST",
                body: JSON.stringify({
                    ...data,
                    courseId: Number(id) || 0
                }),
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
            setLoading(false);
        }
    }

    if (!course) return null;
    return (
        !success ? <div className="w-full min-h-screen bg-[#FAF8F6]">
            <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-4 py-12">

                {/* Breadcrumb */}
                <section className="w-full max-w-full flex flex-col gap-6">
                    <div className="flex items-center gap-6">
                        <button onClick={() => { router.push('/course') }} className="flex items-center gap-2 px-4 py-2 border border-[#dadada] rounded-full bg-[#fbfbfb] text-[#2f3c30] text-sm cursor-pointer">
                            <ChevronLeft />
                            Quay lại
                        </button>
                        <div className="flex items-center gap-2 text-[#607361] text-[18px]">
                            <span>Khoá học</span>
                            <span>/</span>
                            <span className="text-[#2f3c30] font-medium">
                                {course.name}
                            </span>
                        </div>
                    </div>

                    {/* Title & Description */}
                    <div className="flex flex-col gap-4">
                        <h1 className="text-[26px] font-semibold text-[#2f3c30]">
                            {course.name}
                        </h1>
                    </div>

                    {/* Main Image */}
                    <img
                        src={'/rectangle 573.png'}
                        alt="Workshop"
                        className="w-full h-auto object-cover rounded-[24px] mt-4"
                    />
                </section>

                {/* Content Section */}
                <section className="w-full max-w-full flex flex-col lg:flex-row gap-10 mt-10">
                    {/* Left Content */}
                    <div className="text-black prose" dangerouslySetInnerHTML={{ __html: course.detail }} />

                    {/* Sidebar */}
                    <aside className="w-full max-w-[342px] bg-white border border-[#efeae7] rounded-3xl p-5 flex flex-col gap-5 h-fit">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xl font-semibold text-[#2f3c30]">
                                Thông tin Workshop
                            </h4>
                            <img src={'/image 62.png'} alt="Workshop icon" className="w-8 h-8" />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center gap-2 text-sm text-[#607361]">
                                    <Calendar className="w-5 h-5" />
                                    Ngày bắt đầu
                                </div>
                                <p className="text-base font-bold text-[#2f3c30] mt-2">
                                    28/09/2025 20:30
                                </p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-sm text-[#607361]">
                                    <User className="w-5 h-5" />
                                    Giảng viên
                                </div>
                                <p className="text-base font-bold text-[#2f3c30] mt-2">
                                    {course.teacher}
                                </p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-sm text-[#607361]">
                                    <Pencil className="w-5 h-5" />
                                    Hình thức
                                </div>
                                <p className="text-base font-bold text-[#2f3c30] mt-2">
                                    Online qua Zoom
                                </p>
                            </div>
                        </div>
                        <button onClick={() => {
                            if (!user) {
                                window.location.href = '/sign-in';
                                return;
                            }
                            setOpenModal(true)
                        }} className="w-full h-11 bg-[#B5ED76] rounded-full text-[#2f3c30] font-semibold mt-3">
                            Đăng ký
                        </button>
                    </aside>
                </section>

                <div className="w-full border-[1px] border-[#DBDBDB] my-[60px]"></div>

                {/* Similar Courses */}
                <section className="w-full max-w-full flex flex-col gap-8">
                    <h2 className="text-2xl font-semibold text-[#2f3c30]">
                        Các khoá học tương tự
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {courses.slice(0, 3).map((item, index) => {
                            const icon = filters.find(i => i.key === item.category).icon;
                            return <div key={index} className="flex flex-col gap-5 h-auto bg-white flex items-start justify-between rounded-[24px] border border-[#F0EAE7] shadow-sm hover:shadow-md transition">
                                <img src={item.thumbnail} className="rounded-t-[24px] w-full" />
                                <div className={'flex justify-between w-full flex-col p-5 pt-0'}>
                                    <div className="font-bold text-[18px] text-[#2F3C30]">{item.name}</div>
                                    <div className="text-[14px] text-[#607362] mt-[6px]">{item.description}</div>
                                    <div key={item.key} className={`mt-4 cursor-pointer px-4 py-2 w-fit flex gap-2 rounded-full bg-[#F5F7F6]`}>
                                        <img src={icon} />
                                        <p className={`text-[#607362]`}>{item.category}</p>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </section>
            </div>

            {openModal && <AnimatePresence>
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
                            onClick={() => setOpenModal(false)}
                            className="absolute top-11 -right-8 w-9 h-9 bg-white shadow-lg border border-gray-200 flex items-center justify-center rounded-r-full rounded-l-none z-40 hover:bg-gray-100 transition-all duration-150"
                            style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}
                            aria-label="Đóng"
                        >
                            <X className="w-12 h-12 text-[#2D221B]" />
                        </Button>
                        <div
                            className="w-full max-w-xl h-full rounded-b-[36px] px-1 pb-1 flex flex-col items-center relative z-10"
                            style={{ boxShadow: '0 8px 32px 0 rgba(75,55,46,0.12)' }}>
                            {/* Lớp trắng phía trước (nội dung chính) */}
                            <div
                                className="relative z-20 w-full max-w-xl p-6 mx-auto rounded-[20px] bg-white flex flex-col overflow-hidden border border-transparent shadow-2xl"
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
                                <div className="grid grid-cols-3 gap-5 w-full h-auto border border-[#F0EAE7] rounded-[24px] box-border p-[19.5px_16px]">
                                    <div className="col-span-2 flex flex-col gap-[10px]">
                                        <div className="text-[#2F3C30] text-[18px] font-bold">{course.name}</div>
                                        <div className="text-[#607362] text-[14px]">{course.description}</div>
                                    </div>
                                    <img src={course.thumbnail} className="rounded-[10px] col-span-1" />
                                </div>
                                <div className={'space-y-5 mt-6'}>
                                    <div className="mb-4">
                                        <label className="block text-xs text-[#6B5B4A] mb-1.5 font-medium">Họ và tên<span
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
                                        <label className="block text-xs text-[#6B5B4A] mb-1.5 font-medium">Câu hỏi cho giảng viên</label>
                                        <Textarea
                                            placeholder="Nhập câu hỏi"
                                            value={data.question}
                                            onChange={(e) => setData({ ...data, question: e.target.value })}
                                            className="min-h-[100px] bg-[#f3faf5] border border-[#E5E7EB] text-[#22372B] placeholder:text-[#B0B7A1] rounded-xl"
                                        />
                                    </div>

                                    <Button
                                        disabled={loading || !data.name || !data.email}
                                        onClick={handleRegisterCourse}
                                        className="cursor-pointer flex-1 h-12 rounded-full bg-[#B5ED76] hover:bg-[#16A34A] text-black text-base w-full shadow-none"
                                    >{loading && <Loader2 className="animate-spin w-5 h-5" />} Đăng ký</Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </AnimatePresence >
            }
        </div > : <div className="w-full min-h-screen bg-[#FAF8F6]">
            <Congrats setOpen={() => {
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
                        <p className="text-[#2F3C30] text-[18px] font-bold">{course.name}</p>
                        <p className="text-[#607362] text-[14px]">{course.description}</p>
                    </div>
                    <img src={course.thumbnail} className="w-[134px] h-[75px] rounded-[12px]" />
                </div>

                <div className="w-full flex flex-col gap-">
                    <div className="flex justify-between text-base text-[#607361]">
                        <span>Ngày bắt đầu</span>
                        <span className="text-[#2f3c30] font-bold">
                            28/09/2025 20:30
                        </span>
                    </div>
                    <div className="h-px w-full bg-[#EBEBEB] my-4" />
                    <div className="flex justify-between text-base text-[#607361]">
                        <span>Trainer</span>
                        <span className="text-[#2f3c30] font-bold">{course.teacher}</span>
                    </div>
                    <div className="h-px w-full bg-[#EBEBEB] my-4" />
                    <div className="flex justify-between text-base text-[#607361]">
                        <span>Hình thức</span>
                        <span className="text-[#2f3c30] font-bold">Online qua Zoom</span>
                    </div>
                    <div className="h-px w-full bg-[#EBEBEB] my-4" />
                </div>
            </Congrats>
        </div>
    );
};
