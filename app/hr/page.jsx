"use client";
import React, { useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import DetailModal from "@/app/hr/_components/DetailModal";
import BookModal from "./_components/BookModal";
import Congrats from "@/components/congrats";

function Hr() {
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

    return (
        <div className="w-full min-h-screen bg-[#FAF8F6]">
            <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-4 py-12">
                <div className={'flex justify-between items-center w-full'}>
                    <div className={'font-semibold text-[32px] text-[#2F3C30]'}>Danh sách HR</div>
                    <Select
                        value={selectedCompany}
                        onValueChange={setSelectedCompany}
                    >
                        <SelectTrigger
                            className="w-[219px] border border-[#E5E5E5] bg-white text-[#2D221B] focus:border-[#B6F09C] focus:ring-[#B6F09C]/20 rounded-xl h-10">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-[#2D221B]">
                            {[{ company: 'Tất cả công ty' }, ...hrList].map((industry, index) => (
                                <SelectItem
                                    key={index}
                                    value={industry.company}
                                    className="flex items-center gap-2"
                                >
                                    {industry.company}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className={'mt-8'}>
                    <div className={'grid grid-cols-3 gap-4'}>
                        {list.map((industry, index) => {
                            const { name, avatar, company, logo, title } = industry;
                            return <div key={index}
                                className="flex flex-col gap-5 h-[193px] bg-white flex items-start justify-between rounded-[24px] border border-[#F0EAE7] p-6 shadow-sm hover:shadow-md transition">
                                {/* Avatar + Info */}
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
                                <div className={'w-full border border-[#F4F4F4]'}></div>
                                <div className={'flex items-center justify-between w-full gap-4'}>
                                    <Button
                                        onClick={() => setHr(industry)}
                                        className={'bg-[#FBFBFB] text-black rounded-full w-1/2 border border-[#DBDBDB] hover:bg-[#B5ED76]'}>Chi
                                        tiết</Button>
                                    <Button
                                        onClick={() => {
                                            setHrBook(industry);
                                        }}
                                        variant="default"
                                        className={'bg-[#B5ED76] text-black rounded-full w-1/2 hover:bg-white hover:border hover:border-[#dbdbdb]'}
                                    >Đặt lịch</Button>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
            {hr ?
                <DetailModal
                    hrEmail={hr.email}
                    name={hr.name} logo={hr.logo} company={hr.company} avatar={hr.avatar} onClose={() => setHr(null)}
                    show={hr}
                />
                : ''}
            {
                hrBook ? <BookModal email={hrBook.email} name={hrBook.name} logo={hrBook.logo} avatar={hrBook.avatar} show={hrBook} onClose={() => setHrBook(null)}
                    company={hrBook.company} /> : ''
            }
        </div>
    );
}

export default Hr;
