"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ChevronDown, CircleUserRound, Crown, HelpCircle, Home, Lightbulb, LogOut, Menu, User, } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/app/context/UserContext";

// Component Header chính của ứng dụng
function Header() {
    const path = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const isDashboard = path === "/dashboard";
    const isInterview = path.includes("interview");
    const isHr = path === '/hr';
    const isCourse = path === '/course';
    const isJob = path === '/job';
    const [showMenuDrawer, setShowMenuDrawer] = useState(false);
    const router = useRouter();
    const user = useUser();

    const handleLogout = () => {
        window.location.href = "/";
        fetch("/api/auth/logout", {
            method: "POST",
        }).catch((error) => {
            console.error("Lỗi khi đăng xuất:", error);
        });
    };

    // Xử lý hiệu ứng cuộn trang
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Không hiển thị header ở trang phỏng vấn
    if (isInterview) return null;

    // Danh sách các mục menu chính
    const menuItems = [
        {
            name: "Dashboard",
            link: "/dashboard",
            icon: Home,
            description: "Your training hub",
        },
        {
            name: "Suggest Us",
            link: "/dashboard/questions",
            icon: Lightbulb,
            description: "Help us improve",
        },
        {
            name: "Upgrade Account",
            link: "/dashboard/upgrade",
            icon: Crown,
            description: "Unlock full potential",
        },
        {
            name: "How It Works?",
            link: "/dashboard/how",
            icon: HelpCircle,
            description: "Learn the process",
        },
    ];

    return (
        <>
            {/* Khoảng trống để tránh nội dung bị che bởi header cố định */}
            <div className="h-[72px]" />

            <header className="w-full bg-[#FAF8F6] border-b border-[#eceae6] fixed top-0 left-0 right-0 z-50">
                <div className="relative">
                    <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 xl:px-32 py-3 z-20">
                        {/* Logo và tên ứng dụng */}
                        <Link href="/" className="flex-shrink-0 relative group flex items-center gap-2">
                            <Image
                                src="/Job Ready.png"
                                alt="Logo"
                                width={150}
                                height={150}
                                quality={100}
                                className="w-auto h-12 relative"
                                priority
                            />
                        </Link>

                        {/* Menu chính ở giữa */}
                        <nav className="flex-1 flex items-center justify-center max-[1440px]:hidden">
                            <ul className="flex gap-8">
                                <li>
                                    <a
                                        href="/dashboard"
                                        className={`font-semibold text-[#3d463b] px-2 py-1 ${isDashboard ? 'border-b-2 border-[#3d463b] font-semibold' : ''} hover:text-lime-700`}
                                    >
                                        Dashboard
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/hr"
                                        className={`font-semibold text-[#3d463b] px-2 py-1 ${isHr ? 'border-b-2 border-[#3d463b] font-semibold' : ''} hover:underline hover:text-lime-700`}
                                    >
                                        Phỏng vấn với HR
                                    </a>
                                </li> : ''
                                <li>
                                    <a
                                        href="/course"
                                        className={`font-semibold text-[#3d463b] px-2 py-1 ${isCourse ? 'border-b-2 border-[#3d463b] font-semibold' : ''} hover:underline hover:text-lime-700`}
                                    >
                                        Khóa học
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/job"
                                        className={`font-semibold text-[#3d463b] px-2 py-1 ${isJob ? 'border-b-2 border-[#3d463b] font-semibold' : ''} hover:underline hover:text-lime-700`}
                                    >
                                        Việc làm
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="font-semibold text-[#3d463b] px-2 py-1 hover:underline hover:text-lime-700"
                                    >
                                        Về chúng tôi
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="font-semibold text-[#3d463b] px-2 py-1 hover:underline hover:text-lime-700"
                                    >
                                        Affiliate
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="font-semibold text-[#3d463b]  px-2 py-1 hover:underline hover:text-lime-700"
                                    >
                                        Cách hoạt động
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        {/* Phần bên phải: Nút nâng cấp và tài khoản người dùng */}
                        <div className="flex items-center gap-3">
                            <Link
                                href="/pricing"
                                className="text-[#4B6358] hover:text-[#22372B] transition-colors font-normal relative"
                            >
                                <Image
                                    src="/header-diamond.png"
                                    alt="Diamond"
                                    width={39}
                                    height={39}
                                    className="absolute -left-4"
                                />
                                <Button
                                    className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-full px-6 py-2 flex items-center gap-2 shadow-md">
                                    Nâng cấp
                                </Button>
                            </Link>
                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div className="flex items-center gap-2 cursor-pointer">
                                            <img
                                                className="w-[50px] h-[50px] cursor-pointer"
                                                alt="Avatar"
                                                src={'/ellipse-1.svg'}
                                            />
                                            <ChevronDown className="w-5 h-5 text-black" />
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuContent className="p-2 bg-white border-gray-100 text-black">
                                            <DropdownMenuItem className="hover:!bg-gray-100 cursor-pointer hover:!text-black" onClick={() => router.push('/profile')}>
                                                <span className="w-full text-center flex gap-2 items-center justify-center">
                                                    <User /> Cá nhân
                                                </span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="cursor-pointer hover:!bg-gray-100 hover:!text-black"
                                                onClick={handleLogout}
                                            >
                                                <span className="w-full text-center flex gap-2 items-center justify-center">
                                                    <LogOut className="text-red-500" />
                                                    Đăng xuất
                                                </span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenuPortal>
                                </DropdownMenu>
                            ) : (
                                ""
                            )}
                            <Menu
                                className="cursor-pointer ml-1 text-[50px] min-[1440px]:hidden"
                                color="black"
                                onClick={() =>
                                    setShowMenuDrawer(!showMenuDrawer)
                                }
                            />
                        </div>
                    </div>

                    <AnimatePresence>
                        {showMenuDrawer && (
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="absolute left-0 right-0 top-full block w-full bg-[#f4f3f2] p-5 rounded-b-[32px] shadow-lg z-10"
                            >
                                <ul className="flex gap-8 flex-col justify-center items-center">
                                    <li>
                                        <a
                                            href="/dashboard"
                                            className="font-semibold text-[#3d463b] font-semibold px-2 py-1 border-b-2 border-[#3d463b] hover:text-lime-700"
                                        >
                                            Dashboard
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/hr"
                                            className={`font-semibold text-[#3d463b] px-2 py-1 ${isHr ? 'border-b-2 border-[#3d463b] font-semibold' : ''} hover:underline hover:text-lime-700`}
                                        >
                                            Phỏng vấn với HR
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/course"
                                            className={`font-semibold text-[#3d463b] px-2 py-1 ${isCourse ? 'border-b-2 border-[#3d463b] font-semibold' : ''} hover:underline hover:text-lime-700`}
                                        >
                                            Khóa học
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/job"
                                            className={`font-semibold text-[#3d463b] px-2 py-1 ${isJob ? 'border-b-2 border-[#3d463b] font-semibold' : ''} hover:underline hover:text-lime-700`}
                                        >
                                            Việc làm
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="font-semibold text-[#3d463b] px-2 py-1 hover:underline hover:text-lime-700"
                                        >
                                            Về chúng tôi
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="font-semibold text-[#3d463b] px-2 py-1 hover:underline hover:text-lime-700"
                                        >
                                            Affiliate
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="font-semibold text-[#3d463b] px-2 py-1 hover:underline hover:text-lime-700"
                                        >
                                            Cách hoạt động
                                        </a>
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </header>
        </>
    );
}

export default Header;
