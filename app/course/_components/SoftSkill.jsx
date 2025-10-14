import { courses, filters, softSkills } from "@/utils/constants";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react"

export default function SoftSkill() {
    return <div className="flex flex-col gap-6 mt-[18px]">
        <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
            {softSkills.map((item, index) => {
                return <Link href={`/course/${item.id}`} key={index} className="flex flex-col gap-5 h-auto bg-white flex items-start rounded-[24px] border border-[#F0EAE7] shadow-sm hover:shadow-md transition">
                    <img src={item.thumbnail} className="rounded-t-[24px] w-full" />
                    <div className={'flex justify-start items-start w-full flex-col p-5 pt-0'}>
                        <div className={'flex items-center text-[#607362] gap-3'}>
                            <Calendar className={'w-4 h-4'} />
                            28/09/2025 20:30
                        </div>
                        <div className="font-bold text-[18px] text-[#2F3C30] mt-1">{item.name}</div>
                        <div className="text-[14px] text-[#607362] mt-[6px]">{item.description}</div>
                        <div className={'flex items-center gap-2 mt-4'}>
                            <div className={'flex items-center justify-center w-auto px-2 h-[30px] gap-2 bg-[#F5F7F6] rounded-full'}>
                                <img src={'/target_fill.png'} alt={''} />
                                <span className={'text-[#607362]'}>Online</span>
                            </div>
                            <div className={'flex items-center justify-center w-auto px-2 h-[30px] gap-2 bg-[#F5F7F6] rounded-full'}>
                                <Clock className={'w-4 h-4 text-gray-600'} />
                                <span className={'text-[#607362]'}>60 phút</span>
                            </div>
                        </div>
                    </div>
                </Link>
            })}
        </div>
    </div>
}
