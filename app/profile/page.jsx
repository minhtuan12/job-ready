'use client'

import { Tabs } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { Pencil } from 'lucide-react'
import InterviewSchedule from "@/app/profile/_components/InterviewSchedule";
import Course from "@/app/profile/_components/Course";
import { useUser } from "@/app/context/UserContext";
import InterviewList from "./_components/InterviewList";
import { motion } from "framer-motion";
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import ScenarioDesignModal from "../dashboard/_components/ScenarioDesignModal";
import CV from "./_components/CV";
import EditProfile from "./_components/EditProfile";

export default function () {
  const [interviews, setInterviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [highestScore, setHighestScore] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = React.useState("vi");
  const [selectedIndustry, setSelectedIndustry] = React.useState("");
  const [showDesignModal, setShowDesignModal] = useState(false);

  // Lấy dữ liệu danh sách phỏng vấn và điểm cao nhất khi component được mount
  useEffect(() => {
    fetchInterviews();
    fetchHighestScore();
  }, []);

  // Hàm lấy danh sách phỏng vấn từ API
  const fetchInterviews = async () => {
    try {
      const response = await fetch('/api/interview-list');
      if (!response.ok) {
        throw new Error('Failed to fetch interviews');
      }
      const data = await response.json();
      setInterviews(data);
    } catch (error) {
      console.error('Error fetching interviews:', error);
    }
  };

  // Hàm lấy điểm cao nhất từ API
  const fetchHighestScore = async () => {
    try {
      const response = await fetch('/api/highest-score');
      if (!response.ok) {
        throw new Error('Failed to fetch highest score');
      }
      const data = await response.json();
      setHighestScore(data.highestScore);
    } catch (error) {
      console.error('Error fetching highest score:', error);
    }
  };

  // Xử lý xóa phỏng vấn
  const handleDeleteInterview = async (mockId) => {
    try {
      const response = await fetch(`/api/interview-list/${mockId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete interview');
      }

      // Cập nhật lại danh sách phỏng vấn sau khi xóa
      await fetchInterviews();
    } catch (error) {
      console.error('Error deleting interview:', error);
    }
  };

  // Lọc danh sách phỏng vấn dựa trên từ khóa tìm kiếm
  const filteredInterviews = interviews.filter(interview =>
    interview.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interview.industry?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const user = useUser();
  const [openEditProfile, setOpenEditProfile] = useState(false);

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/booking');
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      setBookings(data.bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const tabs = useMemo(() => [
    {
      key: '1',
      label: 'Lịch sử phỏng vấn',
      children: <InterviewList setShowDesignModal={setShowDesignModal} />,
    },
    {
      key: '2',
      label: `Lịch phỏng vấn với HR (${bookings?.length || 0})`,
      children: <InterviewSchedule bookings={bookings} />,
    },
    {
      key: '3',
      label: 'Khoá học đã đăng ký (0)',
      children: <Course />,
    },
    {
      key: '4',
      label: 'CV đã đăng tải',
      children: <CV cvUrls={user.cvUrls || []} />,
    },
  ], [bookings, setShowDesignModal, user]);

  useEffect(() => {
    fetchBookings()
  }, [user]);

  return (
    <main className="w-full flex flex-col items-center bg-[#f6f5ee]">
      <section className="w-full max-w-[1024px] mt-12 flex flex-col gap-8 mb-12">
        <article className="bg-white p-6 rounded-3xl border border-[#efeae7]">
          <div className="flex items-center gap-6">
            <div className="relative flex flex-col items-center">
              <img
                className="w-[106px] h-[106px]"
                alt="Avatar"
                src={'/ellipse-1.svg'}
              />
              <img
                className="w-4 h-4 absolute -left-2.5 top-1"
                alt="Badge"
                src={'/image-5.svg'}
              />
              <div className="relative flex items-center gap-2 w-[100px] px-4 py-1 bg-[#e97957] rounded-full -mt-4">
                <span className="text-white text-sm font-medium w-full text-right">
                  Gói V-VIP
                </span>
                <img
                  className="w-8 h-8 absolute -left-3 -top-1 rotate-[-10deg]"
                  alt="Badge"
                  src={'/image-53.png'}
                />
              </div>
              <div
                className="absolute w-[15px] h-[15px] top-0 left-[108px] bg-[#a9dd6f] rounded rotate-[57.91deg]" />
            </div>
            <div className="flex flex-col flex-1 gap-3">
              <h1 className="text-2xl font-semibold text-[#2f3c30]">
                {user.fullName}
              </h1>
              <p className="text-sm text-[#607361]">HSD: 27/09/2025</p>
            </div>
            <div
              onClick={() => setOpenEditProfile(true)}
              className={'text-[15px] flex items-center justify-between px-4 gap-2 text-black h-11 w-auto rounded-full border border-gray-200 cursor-pointer hover:bg-gray-200 bg-gray-100'}>
              <Pencil className={'w-4 h-4'} />
              Sửa thông tin
            </div>
          </div>

          <div className="mt-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card thống kê 1: Số lượng phỏng vấn */}
                <div className="relative flex items-center justify-between rounded-[1.5rem] px-6 py-5 h-[120px] border border-[#e0d8ce] transition-all duration-200 hover:bg-white hover:border-[#d6d0c4] overflow-hidden">
                  <Image
                    src="/dasboard_background_2.png"
                    alt="Background 1"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    className="absolute inset-0 z-0 rounded-[1.5rem]"
                  />
                  <div className="relative z-10 flex flex-col items-start">
                    <span className="text-2xl font-bold text-[#2d332b] mb-1">{interviews.length}</span>
                    <span className="text-base text-[#6b6f6a]">Buổi phỏng vấn</span>
                  </div>
                </div>
                {/* Card thống kê 2: Điểm cao nhất */}
                <div className="relative flex items-center justify-between rounded-[1.5rem] px-6 py-5 h-[120px] border border-[#cfe2d2] transition-all duration-200 hover:bg-white hover:border-[#b7c8b7] overflow-hidden">
                  <Image
                    src="/dasboard_background_3.png"
                    alt="Background 2"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    className="absolute inset-0 z-0 rounded-[1.5rem]"
                  />
                  <div className="relative z-10 flex flex-col items-start">
                    <span className="text-2xl font-bold text-[#2d332b] mb-1">{highestScore}/100</span>
                    <span className="text-base text-[#6b6f6a]">Điểm cao nhất</span>
                  </div>
                </div>
                {/* Card thống kê 3: Tỷ lệ phát triển */}
                <div className="relative flex items-center justify-between rounded-[1.5rem] px-6 py-5 h-[120px] border border-[#e6e3c9] transition-all duration-200 hover:bg-white hover:border-[#d1ceb6] overflow-hidden">
                  <Image
                    src="/dasboard_background_4.png"
                    alt="Background 3"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    className="absolute inset-0 z-0 rounded-[1.5rem]"
                  />
                  <div className="relative z-10 flex flex-col items-start">
                    <span className="text-2xl font-bold text-[#2d332b] mb-1">+50%</span>
                    <span className="text-base text-[#6b6f6a]">Tỷ lệ phát triển</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </article>

        <Tabs items={tabs} />
      </section>
      <ScenarioDesignModal
        show={showDesignModal}
        onClose={() => setShowDesignModal(false)}
      />
      {openEditProfile ? <EditProfile onClose={() => setOpenEditProfile(false)} /> : ''}
    </main>
  );
};