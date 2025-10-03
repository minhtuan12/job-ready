"use client";
import React, { useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import DetailModal from "@/app/hr/_components/DetailModal";
import BookModal from "./_components/BookModal";
import Congrats from "@/components/congrats";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Tabs } from "antd";
import SoftSkill from "./_components/SoftSkill";
import Specialized from "./_components/Specialized";

export default function () {
    const [selectedCompany, setSelectedCompany] = React.useState('Tất cả công ty');
    const hrList = [
        {
            name: "Nguyễn Văn Phúc",
            title: "Hr",
            company: "MB Bank",
            avatar: "/avatar.jpg",
            logo: "/hr-logo.png",
            email: 'abc@gmail.com'
        },
        {
            name: "Lê Thị Lan",
            title: "Hr",
            company: "Shopee",
            avatar: "/avatar.jpg",
            logo: "/hr-logo.png",
            email: 'abc@gmail.com'
        },
        {
            name: "Trần Thị Hương",
            title: "Lead Hr",
            company: "Viettel",
            avatar: "/avatar.jpg",
            logo: "/hr-logo.png",
            email: 'abc@gmail.com'
        },
        {
            name: "Nguyễn Thị Mai",
            title: "Hr",
            company: "FPT Software",
            avatar: "/avatar.jpg",
            logo: "/hr-logo.png",
            email: 'abc@gmail.com'
        },
        {
            name: "Ngô Thị Bích",
            title: "Hr",
            company: "CMC Global",
            avatar: "/avatar.jpg",
            logo: "/hr-logo.png",
            email: 'abc@gmail.com'
        },
        {
            name: "Phạm Văn An",
            title: "Hr",
            company: "Sotatek",
            avatar: "/avatar.jpg",
            logo: "/hr-logo.png",
            email: 'abc@gmail.com'
        }
    ]
    const list = useMemo(() => {
        if (selectedCompany === 'Tất cả công ty') {
            return hrList;
        }
        return hrList.filter(i => i.company === selectedCompany)
    }, [selectedCompany, hrList]);
    const [hr, setHr] = useState(null);
    const [hrBook, setHrBook] = useState(null);

    const tabs = [
        {
            key: '1',
            label: 'Kĩ năng mềm',
            children: <SoftSkill />,
        },
        {
            key: '2',
            label: `Chuyên môn`,
            children: <Specialized />,
        },
    ];

    return (
        <div className="w-full min-h-screen bg-[#FAF8F6]">
            <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-4 py-12">
                <section className="flex items-center justify-between gap-6 px-8 py-6 bg-[#4f3422] rounded-3xl shadow-[0px_4px_0px_#3e2412] relative overflow-hidden w-full mx-auto">
                    <img
                        className="absolute w-full h-28 top-0 left-0"
                        alt="Background"
                        src={'/image 61.png'}
                    />
                    <img
                        className="absolute w-[70px] h-[101px] top-[11px] left-3.5 object-cover"
                        alt="Decor"
                        src={'/image 7.png'}
                    />
                    <div className="flex items-center gap-8 pl-20 w-fit z-10">
                        <div className="flex flex-col gap-5">
                            <h2 className="text-2xl font-semibold text-[#fff5ef] leading-8">
                                Phỏng vấn để nhận đề xuất
                                <br />
                                khoá học phù hợp với bạn
                            </h2>
                        </div>
                    </div>
                    <Button className="relative bg-[#DE3C58] text-white rounded-full w-[187px] h-[56px] hover:bg-[#F48397]">
                        <p className="absolute top-1/2 -translate-y-1/2 left-6 text-base">Bắt đầu ngay</p>
                        <div className="right-1 top-1/2 -translate-y-1/2 flex items-center justify-center bg-[#F48397] rounded-[50%] w-12 h-12 absolute right-0">
                            <ArrowRight className="w-6 h-6 rotate-[-45deg]" />
                        </div>
                    </Button>
                </section>

                <section className="w-full mx-auto my-10">
                    <h3 className="text-[32px] font-semibold text-[#2f3c30] mb-6">
                        Các học viên khác cũng đang học
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-5 h-auto bg-white flex items-start justify-between rounded-[24px] border border-[#F0EAE7] p-6 shadow-sm hover:shadow-md transition">
                            <div className={'flex justify-between w-full'}>
                                <div className={'flex flex-col gap-2'}>
                                    <div className={'flex items-center text-[#607362] gap-3'}>
                                        <Calendar className={'w-4 h-4'} />
                                        28/09/2025 20:30
                                    </div>
                                    <div className={'text-[#2F3C30] text-[18px] font-bold'}>Khóa học kĩ năng giao tiếp</div>
                                    <div className={'flex items-center gap-2'}>
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
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 h-auto bg-white flex items-start justify-between rounded-[24px] border border-[#F0EAE7] p-6 shadow-sm hover:shadow-md transition">
                            <div className={'flex justify-between w-full'}>
                                <div className={'flex flex-col gap-2'}>
                                    <div className={'flex items-center text-[#607362] gap-3'}>
                                        <Calendar className={'w-4 h-4'} />
                                        28/09/2025 20:30
                                    </div>
                                    <div className={'text-[#2F3C30] text-[18px] font-bold'}>Khóa học kĩ năng giao tiếp</div>
                                    <div className={'flex items-center gap-2'}>
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
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full mx-auto mt-10">
                    <Tabs items={tabs} />
                </section>
            </div>
        </div>
    );
}
