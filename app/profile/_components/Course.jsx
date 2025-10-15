import Image from "next/image";
import React, { useState } from "react";
import { Calendar, Clock, Link as LinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Course({ courses }) {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    return <div className="flex flex-col gap-6">
        {courses.length > 0 ? <>
            <div className="relative w-full">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6b6f6a]">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="#6b6f6a" strokeWidth="2" /><path stroke="#6b6f6a" strokeWidth="2" strokeLinecap="round" d="M20 20l-3-3" /></svg>
                </span>
                <input
                    type="text"
                    placeholder="Tìm theo tên khóa học"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-[1rem] border-2 border-[#e0d8ce] bg-white text-[#3d463b] placeholder-[#6b6f6a] focus:outline-none focus:border-[#b6b6a8] text-base shadow-sm h-full"
                />
            </div>
            <div className={'grid grid-cols-2 gap-6'}>
                {courses.map(i => (
                    <div key={i.name}
                        className="flex flex-col gap-5 h-auto bg-white flex items-start justify-between rounded-[24px] border border-[#F0EAE7] p-6 shadow-sm hover:shadow-md transition">
                        <div className={'flex justify-between w-full'}>
                            <div className={'flex flex-col gap-2'}>
                                <div className={'flex items-center text-[#607362] gap-3'}>
                                    <Calendar className={'w-4 h-4'} />
                                    {i.date || '15/10/2025'}
                                </div>
                                <div className={'text-[#2F3C30] text-[18px] font-bold'}>{i.name}</div>
                                <div className={'flex items-center gap-2'}>
                                    <div className={'flex items-center justify-center w-[82px] h-[30px] gap-2 bg-[#F5F7F6] rounded-full'}>
                                        <img src={'/target_fill.png'} alt={''} />
                                        <span className={'text-[#607362]'}>Online</span>
                                    </div>
                                    <div className={'flex items-center justify-center w-[82px] h-[30px] gap-2 bg-[#F5F7F6] rounded-full'}>
                                        <Clock className={'w-3 h-3'} />
                                        <span className={'text-[#607362]'}>60 phút</span>
                                    </div>
                                </div>
                            </div>
                            <img src={'/course.png'} alt={''} className={'rounded-[16px]'} />
                        </div>
                        <div className={'w-full border border-[#F4F4F4]'}></div>
                        <button className={'hover:bg-gray-100 h-11 justify-center items-center text-base w-full border border-[#DBDBDB] rounded-full flex gap-2 bg-white bg-gray-100 cursor-pointer'}>
                            <LinkIcon /> Link tham dự
                        </button>
                    </div>
                ))}
            </div>
        </> : <div className="flex flex-col gap-6 items-center justify-center py-20">
            <img src={'/image 63.png'} alt="" />
            <div className="text-[24px] font-semibold">Bạn chưa tham gia khóa học nào</div>
            <div className="text-base text-[#607362] w-[450px] text-center">Rèn luyện chuyên môn và kỹ năng mềm để tự tin hơn khi ứng tuyển qua các khoá học hoàn toàn miễn phí</div>
            <button className="rounded-full bg-[#B5ED76] h-11 w-30 px-6"><Link href="/course" className="text-black">Khám phá ngay</Link></button>
        </div>
        }
    </div>
}
