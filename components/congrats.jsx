import { Button } from "./ui/button";

export default function Congrats({ children, setOpen, resend = true }) {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            {/* lớp mask mờ */}
            <div className="absolute inset-0 bg-black/70" />

            {/* nội dung modal */}
            <div className="relative w-[1162px] h-[734px] z-10 flex justify-center items-center">
                <img
                    className="absolute w-full h-[646px] -top-20"
                    alt="Layer"
                    src={"/Layer_1.png"}
                />
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white rounded-[20px] w-[478px] py-8 px-10 flex flex-col items-center gap-6 shadow-xl">
                    <img
                        className="absolute w-full h-full top-[-28px] !w-16 !h-16"
                        alt="Success Icon"
                        src={"/tick.png"}
                    />

                    {children}

                    {resend ? <div className="text-center text-base text-[#607361]">
                        Chưa nhận được link?{" "}
                        <span className="text-[#2f3c30] font-bold cursor-pointer">
                            Gửi lại
                        </span>
                    </div> : ''}
                    <Button
                        onClick={setOpen}
                        className="cursor-pointer flex-1 h-12 rounded-full bg-[#B5ED76] hover:bg-[#16A34A] text-black text-base w-full shadow-none"
                    >Đóng</Button>
                </div>
            </div>
        </div>
    );
}
