import { courses, filters } from "@/utils/constants";
import Link from "next/link";
import { useMemo, useState } from "react"

export default function Specialized() {
    const [selectedFilter, setSelectedFilter] = useState('all');

    const filteredCourses = useMemo(() => {
        if (selectedFilter === 'all') return courses;
        return courses.filter(item => item.category === selectedFilter);
    }, [courses, selectedFilter])

    return <div className="flex flex-col gap-6 mt-[18px]">
        <div className="flex gap-3">
            {filters.map(item => (
                <div key={item.key} onClick={() => setSelectedFilter(item.key)} className={`cursor-pointer px-4 py-2 w-fit flex gap-2 rounded-full border border-[#B4BEB5] ${selectedFilter === item.key ? 'bg-[#8ABE50]' : 'bg-transparent'} `}>
                    <img src={item.icon} className={`${item.key === 'all' ? 'mt-0.3' : 'mt-0'}`} />
                    <p className={`${selectedFilter === item.key ? 'text-white' : 'text-[#607362]'}`}>{item.label}</p>
                </div>
            ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
            {filteredCourses.map((item, index) => {
                const icon = filters.find(i => i.key === item.category).icon;
                return <Link href={item.link} target="_blank" key={index} className="flex flex-col gap-5 h-auto bg-white flex items-start rounded-[24px] border border-[#F0EAE7] shadow-sm hover:shadow-md transition">
                    <img src={item.thumbnail} className="rounded-t-[24px] w-full" />
                    <div className={'flex justify-between w-full flex-col p-5 pt-0'}>
                        <div className="font-bold text-[18px] text-[#2F3C30]">{item.name}</div>
                        <div className="text-[14px] text-[#607362] mt-[6px]">{item.description}</div>
                        <div key={item.key} className={`mt-4 cursor-pointer px-4 py-2 w-fit flex gap-2 rounded-full bg-[#F5F7F6]`}>
                            <img src={icon} />
                            <p className={`text-[#607362]`}>{item.category}</p>
                        </div>
                    </div>
                </Link>
            })}
        </div>
    </div>
}
