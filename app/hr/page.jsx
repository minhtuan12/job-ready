"use client";
import React, { useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import DetailModal from "@/app/hr/_components/DetailModal";
import BookModal from "./_components/BookModal";
import Congrats from "@/components/congrats";
import { hrList } from "@/utils/constants";
import { useUser } from "../context/UserContext";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

function Hr() {
    const [selectedCompany, setSelectedCompany] = React.useState('Tất cả công ty');
    const list = useMemo(() => {
        if (selectedCompany === 'Tất cả công ty') {
            return hrList;
        }
        return hrList.filter(i => i.company === selectedCompany)
    }, [selectedCompany, hrList]);
    const [hr, setHr] = useState(null);
    const [hrBook, setHrBook] = useState(null);
    const user = useUser();

    return (
        user?.packages === 'vip' ? <div className="w-full min-h-screen bg-[#FAF8F6]">
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
                                    </div>
                                    <div className={'space-y-2'}>
                                        <p className="font-bold text-[18px] text-[#2F3C30]">{name}</p>
                                        <p className="text-[14px] text-[#607362]">{company}</p>
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
                    detail={hr.detail}
                    hrEmail={hr.email}
                    name={hr.name} logo={hr.logo} company={hr.company} avatar={hr.avatar} onClose={() => setHr(null)}
                    show={hr}
                />
                : ''}
            {
                hrBook ? <BookModal email={hrBook.email} name={hrBook.name} logo={hrBook.logo} avatar={hrBook.avatar} show={hrBook} onClose={() => setHrBook(null)}
                    company={hrBook.company} /> : ''
            }
        </div> : <div className="w-full min-h-screen bg-[#FAF8F6]">
            <AnimatePresence>
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
                        {/* Viền nâu phía dưới, trái, phải */}
                        <div
                            className="w-full max-w-xl h-auto rounded-b-[20px] flex flex-col items-center relative z-10"
                            style={{ boxShadow: '0 8px 32px 0 rgba(75,55,46,0.12)' }}>
                            {/* Lớp trắng phía trước (nội dung chính) */}
                            <div
                                className="bg-[#F7F5EF] relative z-20 w-full mx-auto rounded-[20px] bg-white flex flex-col overflow-hidden border border-transparent shadow-2xl"
                            >
                                {/* Nội dung chính của modal */}
                                <div className="py-6 px-10 h-[709px] w-auto bg-[#F7F5EF]">
                                    <img src="/top.png" className="w-full" />
                                    <div className="mt-6">
                                        <div className="text-[28px] text-black font-semibold w-full px-10 text-center">
                                            Mở khóa cơ hội phỏng vấn với HR từ các doanh nghiệp
                                        </div>
                                        <div className="text-[#607362] text-base leading-6 text-center mt-4">
                                            Không chỉ luyện tập, bạn sẽ được HR từ doanh nghiệp lớn phỏng vấn thật và chỉnh sửa điểm yếu ngay lập tức
                                        </div>
                                    </div>
                                    <img src="bottom.png" className="mt-[40px] w-full" />
                                    <Link href="/pricing">
                                        <Button className="-mb-6 hover:bg-[#E73F5C] bg-[#DE3C58] text-white mt-10 rounded-full w-full h-12">Nâng cấp ngay</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </AnimatePresence>
        </div>
    );
}

export default Hr;
