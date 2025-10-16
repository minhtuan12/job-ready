"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import DetailModal from "@/app/hr/_components/DetailModal";
import BookModal from "./_components/BookModal";
import Congrats from "@/components/congrats";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar, CircleDollarSign, Clock, MapPin, RefreshCw } from "lucide-react";
import { Tabs } from "antd";
import SoftSkill from "./_components/SoftSkill";
import Specialized from "./_components/Specialized";
import { filters, jobs } from "@/utils/constants";
import Application from "./_components/Application";
import Link from 'next/link'
import { useUser } from "../context/UserContext";

export default function () {
    const [selectedJob, setSelectedJob] = useState(jobs[0]);
    const [search, setSearch] = useState("");
    const [filteredJobs, setFilteredJobs] = useState(jobs);
    const [category, setCategory] = useState(undefined);
    const [address, setAddress] = useState(undefined);
    const [salary, setSalary] = useState(undefined);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [isApplying, setIsApplying] = useState(false);
    const user = useUser();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (search) {
                setFilteredJobs(prev => prev?.filter(i => i.name.toLowerCase()?.includes(search.toLowerCase())) || [])
            } else {
                setFilteredJobs(jobs || []);
            }
        }, 500); // delay 500ms

        return () => clearTimeout(timer); // clear nếu user gõ tiếp
    }, [search]);

    useEffect(() => {
        let result = filteredJobs;
        if (category && category !== 'all') {
            result = result.filter(item => item.category === category);
        }
        if (address) {
            result = result.filter(item => item.address === address);
        }
        if (salary) {
            result = result.filter(item => item.salary === salary);
        }
        if (JSON.stringify(result) !== JSON.stringify(filteredJobs)) {
            setFilteredJobs(result);
        }
    }, [category, address, salary, filteredJobs]);

    useEffect(() => {
        fetch(`/api/job`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Không thể lấy dữ liệu việc làm');
                }
                return response.json();
            })
            .then(data => {
                setAppliedJobs(data?.aplications || []);
            })
            .catch(error => {
                console.error("Lỗi khi lấy dữ liệu kịch bản:", error);
            });
    }, [])

    return (
        <div className="w-full min-h-screen bg-[#FAF8F6]">
            <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-4 py-12">
                <section className="flex items-center justify-between gap-6 px-8 py-6 bg-[#8ABE50] rounded-3xl shadow-[0px_4px_0px_#629726] relative overflow-hidden w-full mx-auto">
                    <img
                        className="absolute w-full h-28 top-0 left-0"
                        alt="Background"
                        src={'/image 61 (1).png'}
                    />
                    <img
                        className="absolute w-full h-28 top-0 left-0"
                        alt="Background 1"
                        src={'/image 62 (1).png'}
                    />
                    <img
                        className="absolute w-[70px] h-[101px] top-[11px] left-3.5 object-cover z-10"
                        alt="Decor"
                        src={'/image 7.png'}
                    />
                    <div className="flex items-center gap-8 pl-20 w-fit z-10">
                        <div className="flex flex-col gap-5">
                            <h2 className="text-2xl font-semibold text-[#fff5ef] leading-8">
                                Phỏng vấn để nhận đề xuất
                                <br />
                                việc làm phù hợp với bạn
                            </h2>
                        </div>
                    </div>
                    <Link href="/dashboard">
                        <Button className="relative bg-[#DE3C58] text-white rounded-full w-[187px] h-[56px] hover:bg-[#F48397]">
                            <p className="absolute top-1/2 -translate-y-1/2 left-6 text-base">Bắt đầu ngay</p>
                            <div className="right-1 top-1/2 -translate-y-1/2 flex items-center justify-center bg-[#F48397] rounded-[50%] w-12 h-12 absolute right-0">
                                <ArrowRight className="w-6 h-6 rotate-[-45deg]" />
                            </div>
                        </Button>
                    </Link>
                </section>

                <div className="mt-8 mb-4 w-full grid grid-cols-5 gap-4 mx-auto">
                    <div className="relative col-span-2">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6b6f6a]">
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="#6b6f6a" strokeWidth="2" /><path stroke="#6b6f6a" strokeWidth="2" strokeLinecap="round" d="M20 20l-3-3" /></svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Tìm theo vị trí công việc"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value) }}
                            className="w-full pl-12 pr-4 py-3 rounded-[1rem] border-2 border-[#e0d8ce] bg-white text-[#3d463b] placeholder-[#6b6f6a] focus:outline-none focus:border-[#b6b6a8] text-base shadow-sm h-full"
                        />
                    </div>
                    <Select
                        value={category}
                        onValueChange={setCategory}
                    >
                        <SelectTrigger

                            className=" col-span-1 border border-[#E5E5E5] bg-white text-[#2D221B] focus:border-[#B6F09C] focus:ring-[#B6F09C]/20 rounded-xl h-10">
                            <SelectValue placeholder="Lĩnh vực" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-[#2D221B]">
                            {filters.map((industry, index) => (
                                <SelectItem
                                    key={index}
                                    value={industry.key}
                                    className="flex items-center gap-2"
                                >
                                    {industry.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        value={address}
                        onValueChange={setAddress}
                    >
                        <SelectTrigger

                            className=" col-span-1 border border-[#E5E5E5] bg-white text-[#2D221B] focus:border-[#B6F09C] focus:ring-[#B6F09C]/20 rounded-xl h-10">

                            <SelectValue placeholder="Địa điểm làm việc" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-[#2D221B]">
                            {[...new Set(jobs.map(item => item.address))].map((industry, index) => (
                                <SelectItem
                                    key={index}
                                    value={industry}
                                    className="flex items-center gap-2"
                                >
                                    {industry}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        value={salary}
                        onValueChange={setSalary}
                    >
                        <SelectTrigger
                            className=" col-span-1 border border-[#E5E5E5] bg-white text-[#2D221B] focus:border-[#B6F09C] focus:ring-[#B6F09C]/20 rounded-xl h-10">
                            <SelectValue placeholder="Mức lương" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-[#2D221B]">
                            {[...new Set(jobs.map(item => item.salary))].map((industry, index) => (
                                <SelectItem
                                    key={index}
                                    value={industry}
                                    className="flex items-center gap-2"
                                >
                                    {industry}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <section className="w-full mx-auto">
                    <div className="flex w-full bg-white border border-[#efeae7] rounded-3xl overflow-hidden">
                        <aside className="flex flex-col border-r border-[#ebebeb] h-full overflow-y-auto w-fit">
                            {filteredJobs.length > 0 ? filteredJobs.map((item, index) => {
                                const category = filters.find(i => i.key === item.category);
                                const isActive = selectedJob?.name === item.name && selectedJob?.company === item.company;
                                return <div key={index} onClick={() => setSelectedJob(item)} className={`relative cursor-pointer flex flex-col gap-2 ${isActive ? 'bg-[#F8FEF2]' : ''}`}>
                                    <div className={`${isActive ? ' before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#4D7323] before:rounded-t-l-full before:content-[""]' : ''} p-5 flex flex-col gap-3`}>
                                        <div className="flex items-center gap-4">
                                            <img src={item.thumbnail} className="rounded-[8px] w-[50px] h-[50px]" />
                                            <div className="flex flex-col gap-1">
                                                <div className="text-[#2F3C30] font-bold text-base">{item.name}</div>
                                                <div className="text-[#607362] text-[14px]">{item.company}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className={`mt-4 h-[30px] px-4 py-2 w-fit flex gap-2 rounded-full bg-[#F5F7F6] items-center justify-center`}>
                                                <MapPin className="text-gray-500 w-4 h-4" />
                                                <p className={`text-[#607362] text-[14px]`}>{item.address}</p>
                                            </div>
                                            <div className={`mt-4 h-[30px] px-4 py-2 w-fit flex gap-2 rounded-full bg-[#F5F7F6] items-center justify-center`}>
                                                <CircleDollarSign className="text-gray-500 w-4 h-4" />
                                                <p className={`text-[#607362] text-[14px]`}>{item.salary}</p>
                                            </div>
                                            <div className={`mt-4 h-[30px] px-4 py-2 w-fit flex gap-2 rounded-full bg-[#F5F7F6] items-center justify-center`}>
                                                <img src={category.icon} />
                                                <p className={`text-[#607362] text-[14px]`}>{item.category}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        index === jobs.length - 1 ? '' : <div className="w-full bg-[#f3f3f3]">
                                            <div className="h-px bg-[#dadada]" />
                                        </div>
                                    }
                                </div>
                            }) : <i className="text-center flex items-center text-black px-10 py-20">Không có kết quả</i>}
                        </aside>
                        <div className="w-px bg-[#f3f3f3]">
                            <div className="h-[110px] bg-[#dadada]" />
                        </div>
                        <div className="p-6 flex flex-col gap-6 flex-1">
                            <div className="flex flex-col">
                                <div className="font-semibold text-[32px] text-[#2F3C30]">{selectedJob.name}</div>
                                <div className="flex items-center gap-2 mt-4">
                                    <img src={selectedJob.thumbnail} className="rounded-[8px] h-7 w-7" />
                                    <div className="flex flex-col gap-1">
                                        <div className="text-[#607362] text-[14px]">{selectedJob.company}</div>
                                    </div>
                                </div>
                                <div className="flex gap-2 h-11 mt-5">
                                    <button onClick={() => {
                                        if (!user) {
                                            window.location.href = '/sign-in';
                                            return;
                                        }
                                        setIsApplying(true)
                                    }} className={`rounded-full w-full h-full ${appliedJobs.some(i => i.jobId === selectedJob.id) ? 'bg-[#CDF7A2]' : 'bg-[#B5ED76]'} text-black hover:bg-[#B5ED76] flex items-center gap-3 justify-center`}>
                                        {appliedJobs.some(i => i.jobId === selectedJob.id) ? <RefreshCw className="w-5 h-5" /> : ''}
                                        Ứng tuyển {appliedJobs.some(i => i.jobId === selectedJob.id) ? 'lại' : 'ngay'}
                                    </button>
                                    <div className="rounded-full h-11 w-11 bg-white flex items-center justify-center border border-[#DBDBDB]">
                                        <img src={'/share.png'} />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full bg-[#f3f3f3]">
                                <div className="h-px bg-[#dadada]" />
                            </div>
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col gap-4">
                                    <div className="text-[#2F3C30] text-[18px] font-bold">Tổng quan công việc</div>
                                    <div className="flex justify-between">
                                        <div className="flex gap-3 items-center">
                                            <div className="rounded-full h-10 w-10 bg-white flex items-center justify-center border border-[#DBDBDB]">
                                                <MapPin className="text-black w-[18px] h-[18px]" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <p className="text-[#607362] text-[14px]">Địa điểm</p>
                                                <p className="text-[#2F3C30] text-base font-semibold">{selectedJob.address}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <div className="rounded-full h-10 w-10 bg-white flex items-center justify-center border border-[#DBDBDB]">
                                                <CircleDollarSign className="text-black w-[18px] h-[18px]" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <p className="text-[#607362] text-[14px]">Mức lương</p>
                                                <p className="text-[#2F3C30] text-base font-semibold">{selectedJob.salary}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <div className="rounded-full h-10 w-10 bg-white flex items-center justify-center border border-[#DBDBDB]">
                                                <img src={'/luggage.png'} className="text-black w-[18px] h-[18px]" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <p className="text-[#607362] text-[14px]">Kinh nghiệm</p>
                                                <p className="text-[#2F3C30] text-base font-semibold">{selectedJob.experience}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="text-[#2F3C30] text-[18px] font-bold">Mô tả công việc</div>
                                    <ul className="list-disc pl-7 text-base text-[#2F3C30] space-y-3">
                                        {selectedJob.descriptions.map(item => <li key={item}>{item}</li>)}
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="text-[#2F3C30] text-[18px] font-bold">Yêu cầu ứng viên</div>
                                    <ul className="list-disc pl-7 text-base text-[#2F3C30] space-y-3">
                                        {selectedJob.requirements.map(item => <li key={item}>{item}</li>)}
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="text-[#2F3C30] text-[18px] font-bold">Quyền lợi</div>
                                    <ul className="list-disc pl-7 text-base text-[#2F3C30] space-y-3">
                                        {selectedJob.benefits.map(item => <li key={item}>{item}</li>)}
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="text-[#2F3C30] text-[18px] font-bold">Địa điểm làm việc</div>
                                    <ul className="list-disc pl-7 text-base text-[#2F3C30] space-y-3">
                                        {selectedJob.workingAddress.map(item => <li key={item}>{item}</li>)}
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="text-[#2F3C30] text-[18px] font-bold">Thời gian làm việc</div>
                                    <ul className="list-disc pl-7 text-base text-[#2F3C30] space-y-3">
                                        {selectedJob.workingTime.map(item => <li key={item}>{item}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
            {isApplying && <Application selectedJob={selectedJob} onClose={() => setIsApplying(false)} />}
        </div >
    );
}
