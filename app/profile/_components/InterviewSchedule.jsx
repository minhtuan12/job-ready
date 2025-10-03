import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Pencil, Link as LinkIcon, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function InterviewSchedule({ bookings }) {
    return bookings?.length > 0 ? <div className={'grid grid-cols-2 gap-6'}>
        {bookings?.map((i, index) => {
            const time = i.interviewTime.split(":");
            const interviewTime = time[0] + ":" + time[1];
            return <div key={index}
                className="flex flex-col gap-5 h-auto bg-white flex items-start justify-between rounded-[24px] border border-[#F0EAE7] p-6 shadow-sm hover:shadow-md transition">
                {/* Avatar + Info */}
                <div className="flex items-center gap-5">
                    <div className={'relative'}>
                        <Image
                            src={'/avatar.jpg'}
                            alt={''}
                            width={56}
                            height={56}
                            className="h-14 w-14 rounded-full object-cover"
                        />
                        <Image
                            src={'/hr-logo.png'}
                            alt={`logo`}
                            width={24}
                            height={24}
                            className="h-6 w-6 rounded-full object-cover absolute bottom-0 -right-1 border border-white"
                        />
                    </div>
                    <div className={'space-y-2'}>
                        <p className="font-bold text-[18px] text-[#2F3C30]">{i.hrEmail}</p>
                        <p className="text-[14px] text-[#607362]">Hr</p>
                    </div>
                </div>
                <div className={'space-y-3 w-full'}>
                    <div className={'w-full border border-[#F4F4F4]'}></div>
                    <div className={'flex items-center justify-between w-full'}>
                        <div className={'gap-2 flex items-center'}>
                            <Clock className={'w-4 h-4'} />
                            Thời gian phỏng vấn
                        </div>
                        <div className={'flex items-center font-bold text-base gap-1.5'}>
                            {new Date(i.interviewDate).toLocaleDateString('vi-VN')}
                            <span>{interviewTime}</span>
                        </div>
                    </div>
                    <div className={'w-full border border-[#F4F4F4]'}></div>
                    <div className={'flex items-center justify-between w-full'}>
                        <div className={'gap-2 flex items-center'}>
                            <Pencil className={'w-4 h-4'} />
                            Hình thức phỏng vấn
                        </div>
                        <div className={'font-bold text-base'}>
                            Google Meet
                        </div>
                    </div>
                    <button className={'!mt-5 hover:bg-gray-100 h-11 justify-center items-center text-base w-full border border-[#DBDBDB] rounded-full flex gap-2 bg-white bg-gray-100 cursor-pointer'}>
                        <LinkIcon /> Link tham dự
                    </button>
                </div>
            </div>
        })}
    </div> : <div className="flex flex-col gap-6 items-center justify-center py-20">
        <img src={'/image 63.png'} alt="" />
        <div className="text-[24px] font-semibold">Bạn chưa có lịch phỏng vấn nào</div>
        <div className="text-base text-[#607362] w-[450px] text-center">Kết nối ngay với HR từ các công ty lớn để luyện tập phỏng vấn thực tế</div>
        <button className="rounded-full bg-[#B5ED76] h-11 w-30 px-6"><Link href="/hr" className="text-black">Kết nối ngay</Link></button>
    </div>
}
