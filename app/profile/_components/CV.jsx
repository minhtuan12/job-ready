import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Calendar, Clock, Ellipsis, Link, Loader2, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CV({ cvUrls = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [filteredCv, setFilteredCv] = React.useState(cvUrls);

  const handleClick = () => {
    fileInputRef.current?.click(); // gọi click của input ẩn
  };

  const handleChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload thất bại");
      }

      const data = await response.json();
      setFilteredCv(prev => [...prev, { name: data.name, url: data.secure_url }])
      console.log("Upload thành công:", data);
    } catch (err) {
      console.error("Đã xảy ra lỗi:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        setFilteredCv(prev => prev?.filter(i => i.name.toLowerCase()?.includes(searchTerm.toLowerCase())) || [])
      } else {
        setFilteredCv(cvUrls || []);
      }
    }, 500); // delay 500ms

    return () => clearTimeout(timer); // clear nếu user gõ tiếp
  }, [searchTerm]);

  return <div className="flex flex-col gap-6">
    <input type="file" ref={fileInputRef} className="hidden" onChange={handleChange} />
    {
      loading ? <Loader2 className="w-6 h-6 animate-spin" /> :
        (cvUrls.length > 0 ? <>
          <div className="w-full flex justify-between">
            <div className="'flex w-[416px] justify-between">
              <div className="relative w-full">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6b6f6a]">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="#6b6f6a" strokeWidth="2" /><path stroke="#6b6f6a" strokeWidth="2" strokeLinecap="round" d="M20 20l-3-3" /></svg>
                </span>
                <input
                  type="text"
                  placeholder="Tìm theo tên CV"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                  }}
                  className="w-full pl-12 pr-4 py-3 rounded-[1rem] border-2 border-[#e0d8ce] bg-white text-[#3d463b] placeholder-[#6b6f6a] focus:outline-none focus:border-[#b6b6a8] text-base shadow-sm h-full"
                />
              </div>
            </div>
            <button onClick={handleClick} className="'px-6 py-3 w-[160px] h-[48px] rounded-full border border-[#E73F5C] text-[#DE3C58]">
              <div className=" item-center justify-center flex gap-3">
                <Upload className="w-5 h-5" />
                <span className="font-medium">Tải lên CV</span>
              </div>
            </button>
          </div>
          <div className={'grid grid-cols-2 gap-4'}>
            {
              filteredCv.map((item, index) => {
                const isPdf = item.url.toLowerCase().endsWith(".pdf");
                const isDoc = item.url.toLowerCase().endsWith(".doc") || item.url.toLowerCase().endsWith(".docx");
                return (
                  <div key={index} className="w-full h-[540px] relative rounded-[24px] shadow-sm overflow-hidden bg-gray-50">
                    {isPdf ? (
                      <iframe src={item.url} className="w-full h-full" />
                    ) : isDoc ? (
                      <iframe
                        src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(item.url)}`}
                        className="w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        Không hỗ trợ preview loại file này
                      </div>
                    )}
                    <div className="border-t border-gray-100 flex justify-between w-full items-center p-5 bg-white box-border h-auto absolute bottom-0">
                      <div className="max-w-[70%] text-ellipsis overflow-hidden font-bold line-clamp-1 h-auto">
                        {item.name.toUpperCase()}
                      </div>
                      <Ellipsis />
                    </div>
                  </div>
                )
              })
            }
          </div>
        </> : <div className="flex flex-col gap-6 items-center justify-center py-20">
          <img src={'/image 63.png'} alt="" />
          <div className="text-[24px] font-semibold">Bạn chưa tải lên CV</div>
          <div className="text-base text-[#607362] w-[450px] text-center">Để HR có thể hỗ trợ và đưa feedback chính xác, hãy cập nhật CV của bạn.</div>
          <button onClick={handleClick} className="rounded-full bg-[#B5ED76] h-11 w-30 px-6">Tải CV lên</button>
        </div>)
    }
  </div>
}
