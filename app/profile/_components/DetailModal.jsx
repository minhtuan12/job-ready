"use client";

import React from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Button} from "@/components/ui/button";
import {X,} from "lucide-react";
import Image from "next/image";
import BookModal from "@/app/hr/_components/BookModal";

const DetailModal = ({
                         name,
                         avatar,
                         company,
                         show,
                         onClose,
                         logo
                     }) => {
    const [openBook, setOpenBook] = React.useState(false);

    return (
        <AnimatePresence>
            {openBook ?
                <BookModal name={name} logo={logo} avatar={avatar} show={openBook} onClose={() => setOpenBook(false)}
                           company={company}/> :
                (show && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        {/* Nền mờ và hiệu ứng blur */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"/>
                        {/* Modal chính, có hiệu ứng động */}
                        <motion.div
                            initial={{opacity: 0, scale: 0.97, y: 20}}
                            animate={{opacity: 1, scale: 1, y: 0}}
                            exit={{opacity: 0, scale: 0.97, y: 20}}
                            transition={{duration: 0.3, ease: 'easeOut'}}
                            className="relative w-full max-w-xl px-2 sm:px-0 flex flex-col items-center z-10 max-h-[90vh]"
                        >
                            {/* Nút đóng modal */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="absolute top-11 -right-8 w-9 h-9 bg-white shadow-lg border border-gray-200 flex items-center justify-center rounded-r-full rounded-l-none z-40 hover:bg-gray-100 transition-all duration-150"
                                style={{boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)'}}
                                aria-label="Đóng"
                            >
                                <X className="w-12 h-12 text-[#2D221B]"/>
                            </Button>
                            {/* Viền nâu phía dưới, trái, phải */}
                            <div
                                className="w-full max-w-xl h-auto rounded-b-[20px] flex flex-col items-center relative z-10"
                                style={{boxShadow: '0 8px 32px 0 rgba(75,55,46,0.12)'}}>
                                {/* Lớp trắng phía trước (nội dung chính) */}
                                <div
                                    className="h-auto p-6 relative z-20 w-full max-w-xl mx-auto rounded-[20px] bg-white flex flex-col overflow-hidden border border-transparent shadow-2xl"
                                    style={{
                                        maxHeight: 'calc(90vh - 120px)', // Trừ chiều cao header
                                        overflowY: 'auto',
                                        scrollbarWidth: 'thin',
                                        scrollbarColor: '#E5D6C6 #FFFFFF'
                                    }}
                                >
                                    {/* Nội dung chính của modal */}
                                    <div className={'space-y-5'}>
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
                                        <div className={'flex gap-4 h-[140px] max-sm:h-auto'}>
                                            <div
                                                className={'w-full h-full p-5 space-y-3 rounded-[24px] border border-[#F0EAE7]'}>
                                                <Image
                                                    src={'/hr-star.png'}
                                                    alt={`logo`}
                                                    width={32}
                                                    height={32}
                                                    className="h-8 w-8 object-cover"
                                                />
                                                <div className={'text-[#607362] text-[14px]'}>Kinh nghiệm</div>
                                                <div className={'text-[#2F3C30] font-bold text-[18px]'}>5 năm</div>
                                            </div>
                                            <div
                                                className={'w-full h-full p-5 space-y-3 rounded-[24px] border border-[#F0EAE7]'}>
                                                <Image
                                                    src={'/hr-world.png'}
                                                    alt={`logo`}
                                                    width={32}
                                                    height={32}
                                                    className="h-8 w-8 object-cover"
                                                />
                                                <div className={'text-[#607362] text-[14px]'}>Ngôn ngữ</div>
                                                <div className={'text-[#2F3C30] font-bold text-[18px]'}>Anh, Việt</div>
                                            </div>
                                            <div
                                                className={'w-full h-full p-5 space-y-3 rounded-[24px] border border-[#F0EAE7]'}>
                                                <Image
                                                    src={'/hr-count.png'}
                                                    alt={`logo`}
                                                    width={32}
                                                    height={32}
                                                    className="h-8 w-8 object-cover"
                                                />
                                                <div className={'text-[#607362] text-[14px]'}>Đã phỏng vấn</div>
                                                <div className={'text-[#2F3C30] font-bold text-[18px]'}>120 buổi</div>
                                            </div>
                                        </div>
                                        <div className={'text-[16px] text-[#607362]'}>
                                            Với hơn 6 năm kinh nghiệm trong lĩnh vực tuyển dụng và quản trị nhân sự tại
                                            các
                                            tập đoàn
                                            đa quốc gia, tôi đã trực tiếp tham gia phỏng vấn và lựa chọn hàng trăm ứng
                                            viên
                                            ở nhiều
                                            cấp độ khác nhau, từ thực tập sinh đến nhân sự chính thức. Trong quá trình
                                            làm
                                            việc, tôi
                                            đặc biệt quan tâm đến các bạn sinh viên mới ra trường, bởi tôi hiểu rõ sự bỡ
                                            ngỡ
                                            và
                                            thiếu tự tin mà các bạn thường gặp phải khi tham gia phỏng vấn lần đầu.
                                            <br/><br/>Chính vì vậy,
                                            tôi luôn mong muốn mang lại những buổi luyện tập thực tế, nơi bạn có thể
                                            trải
                                            nghiệm một
                                            quy trình phỏng vấn như thật và nhận được những góp ý chi tiết, thẳng thắn
                                            nhưng
                                            mang
                                            tính xây dựng. Tôi tin rằng chỉ cần được chuẩn bị đúng cách và được chỉ dẫn
                                            từ
                                            người có
                                            kinh nghiệm, mỗi ứng viên đều có thể phát huy tối đa tiềm năng của mình và
                                            tự
                                            tin hơn
                                            trên hành trình sự nghiệp.
                                        </div>
                                        <Button
                                            onClick={() => setOpenBook(true)}
                                            className="flex-1 h-12 rounded-full bg-[#B5ED76] hover:bg-[#16A34A] text-black text-base w-full shadow-none"
                                        >Đặt lịch</Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ))
            }
        </AnimatePresence>
    );
};

export default DetailModal;
