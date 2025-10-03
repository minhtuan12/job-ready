"use client";

import React from "react";
import { Calendar, ChevronLeft, Pencil, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { courses, filters } from "@/utils/constants";

export default function ({ params }) {
    const router = useRouter();
    return (
        <div className="w-full min-h-screen bg-[#FAF8F6]">
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
                                Kỹ năng Giao tiếp Tự tin trong Phỏng vấn
                            </span>
                        </div>
                    </div>

                    {/* Title & Description */}
                    <div className="flex flex-col gap-4">
                        <h1 className="text-[26px] font-semibold text-[#2f3c30]">
                            Kỹ năng Giao tiếp Tự tin trong Phỏng vấn
                        </h1>
                        <p className="text-[18px] text-[#2F3C30]">
                            Rèn luyện kỹ năng giao tiếp, ngôn ngữ cơ thể và cách trả lời phỏng
                            vấn chuyên nghiệp.
                        </p>
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
                    <article className="flex-1 flex flex-col gap-10">
                        {/* Description */}
                        <section className="flex flex-col gap-5">
                            <h2 className="text-2xl font-semibold text-[#2f3c30]">
                                1. Mô tả khóa học
                            </h2>
                            <p className="text-lg text-[#2f3c30]">
                                Workshop này được thiết kế dành riêng cho sinh viên và người mới
                                đi làm, giúp bạn:
                            </p>
                            <ul className="list-disc pl-5 text-lg text-[#2f3c30] space-y-2">
                                <li>Tự tin khi đối diện nhà tuyển dụng.</li>
                                <li>Biết cách trình bày ý tưởng mạch lạc, rõ ràng.</li>
                                <li>Sử dụng ngôn ngữ cơ thể để gây ấn tượng tốt.</li>
                                <li>Xử lý tình huống bất ngờ trong phỏng vấn.</li>
                            </ul>
                        </section>

                        {/* Learning Outcomes */}
                        <section className="flex flex-col gap-5">
                            <h2 className="text-2xl font-semibold text-[#2f3c30]">
                                2. Bạn sẽ học được gì
                            </h2>
                            <div className="text-lg text-[#2f3c30] space-y-2 flex flex-col">
                                <span>✅ Làm chủ giọng nói, tốc độ và cách biểu đạt.</span>
                                <span>✅ Hiểu rõ kỹ thuật đặt – trả lời câu hỏi.</span>
                                <span>✅ Xây dựng sự tự tin và chuyên nghiệp.</span>
                                <span>✅ Nhận feedback trực tiếp từ trainer có kinh nghiệm.</span>
                            </div>
                        </section>

                        {/* Target Audience */}
                        <section className="flex flex-col gap-5">
                            <h2 className="text-2xl font-semibold text-[#2f3c30]">
                                3. Ai nên tham gia
                            </h2>
                            <ul className="list-disc pl-5 text-lg text-[#2f3c30] space-y-2">
                                <li>Sinh viên sắp tốt nghiệp, chuẩn bị đi phỏng vấn.</li>
                                <li>Người mới đi làm muốn cải thiện sự tự tin.</li>
                                <li>Ứng viên chuyển việc, cần nâng cấp kỹ năng giao tiếp.</li>
                            </ul>
                        </section>

                        {/* Instructor Info */}
                        <section className="flex flex-col gap-5">
                            <h2 className="text-2xl font-semibold text-[#2f3c30]">
                                4. Thông tin giảng viên
                            </h2>
                            <img
                                src="/Group 37.png"
                                alt="Instructor"
                                className="max-w-[642px] h-[347px] object-cover rounded-2xl"
                            />
                            <h3 className="text-xl font-semibold text-[#2f3c30]">
                                Chị Nguyễn Minh Anh
                            </h3>
                            <ul className="list-disc pl-5 text-lg text-[#2f3c30] space-y-2">
                                <li>HR Manager tại FPT Software.</li>
                                <li>
                                    <strong>10+</strong> năm kinh nghiệm tuyển dụng & đào tạo.
                                </li>
                                <li>
                                    Đã phỏng vấn hơn <strong>3.000</strong> ứng viên từ fresher đến
                                    quản lý.
                                </li>
                            </ul>
                        </section>
                    </article>

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
                                    Nguyễn Minh Anh – HR Manager tại FPT Software
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
                        <button className="w-full h-11 bg-[#B5ED76] rounded-full text-[#2f3c30] font-semibold mt-3">
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
        </div>
    );
};
