export const courses = [
    {
        thumbnail: "/c1.png",
        name: "Làm chủ ngành Marketing",
        description: "Món quà dành tặng các bạn sinh viên chuẩn bị ra trường và tham gia thị trường lao động",
        category: "Marketing",
    },
    {
        thumbnail: "/c2.png",
        name: "Học lập trình Web từ A → Z",
        description: "Món quà dành tặng các bạn sinh viên chuẩn bị ra trường và tham gia thị trường lao động",
        category: "IT",
    },
    {
        thumbnail: "/c3.png",
        name: "Kỹ năng thuyết phục khách hàng",
        description: "Món quà dành tặng các bạn sinh viên chuẩn bị ra trường và tham gia thị trường lao động",
        category: "Sale",
    },
    {
        thumbnail: "/c4.png",
        name: "100 bài code thiếu nhi",
        description: "Món quà dành tặng các bạn sinh viên chuẩn bị ra trường và tham gia thị trường lao động",
        category: "IT",
    },
    {
        thumbnail: "/c5.png",
        name: "Nắm bắt tâm lý khách hàng",
        description: "Món quà dành tặng các bạn sinh viên chuẩn bị ra trường và tham gia thị trường lao động",
        category: "Sale",
    },
    {
        thumbnail: "/c6.png",
        name: "Viết content sao cho thu hút",
        description: "Món quà dành tặng các bạn sinh viên chuẩn bị ra trường và tham gia thị trường lao động",
        category: "Marketing",
    },
]

export const filters = [
    { label: 'Tất cả', key: 'all', icon: '/all.png' },
    { label: 'Marketing', key: 'Marketing', icon: '/mkt.png' },
    { label: 'Sale', key: 'Sale', icon: '/sale.png' },
    { label: 'IT', key: 'IT', icon: '/it.png' }
]

export const jobs = [
    {
        id: 1,
        experience: 'Không yêu cầu',
        thumbnail: "/viettel.png",
        name: "Thực tập sinh Marketing",
        address: "Hà Nội",
        salary: "Lên đến 3 triệu",
        category: "Marketing",
        company: "Viettel Software",
        descriptions: [
            "Quản trị hệ thống kênh Youtube của công ty.",
            "Tạo kênh, đăng tải video lên hệ thống kênh quản lý theo kế hoạch.",
            "Chỉnh sửa video: Cắt, ghép, biên tập video, tạo ảnh thumbnail cho video.",
            "Chăm sóc kênh: Comment tương tác với người xem, các nghiệp vụ promote cho video/kênh.",
            "Phân tích các chỉ số quan trọng trong quản trị kênh: Analytics…"
        ],
        requirements: [
            "Nam/nữ đã hoàn thành xong chương trình học đại học (chấp nhận chờ bằng).",
            "KHÔNG YÊU CẦU KINH NGHIỆM CHUYÊN MÔN",
            "Có thể sử dụng cơ bản Premiere, Photoshop là 1 lợi thế",
            "Tư duy sáng tạo, đưa ra các đề xuất phát triển kênh",
            "Có khả năng bắt trend"
        ],
        benefits: [
            "CÓ CẤP DẤU MỘC THỰC TẬP CHO SINH VIÊN NĂM CUỐI",
            "Học việc 1 tháng: phụ cấp 1tr5/tháng + phụ cấp ăn trưa 30.000đ/ngày (tối đa 1 tháng, làm tốt xem xét từ 2 tuần)",
            "Thử việc (1-2 tháng): hưởng 85% lương cứng 7.000.000đ + trợ cấp ăn trưa 30.000đ/ngày + trợ cấp xăng xe 200.000đ/tháng",
            "Chính thức: 7.000.000đ lương cứng + trợ cấp ăn trưa 30.000đ/ngày + trợ cấp xăng xe 200.000đ/tháng",
            "THƯỞNG kênh từ kênh youtube của công ty (3–4tr/tháng) => Tổng thu nhập 10.000.000–15.000.000đ"
        ],
        workingAddress: ["Hà Nội: Số 157 Cầu Diễn, Phú Diễn, Bắc Từ Liêm"],
        workingTime: ["Thứ 2 – Thứ 6 (từ 08:15 đến 17:30)"]
    },
    {
        id: 2,
        experience: 'Không yêu cầu',
        thumbnail: "/mbbank.png",
        name: "IOS Developer Intern",
        address: "Hà Nội",
        salary: "Lên đến 5 triệu",
        category: "IT",
        company: "MB Bank",
        descriptions: [
            "Quản trị hệ thống kênh Youtube của công ty.",
            "Tạo kênh, đăng tải video lên hệ thống kênh quản lý theo kế hoạch.",
            "Chỉnh sửa video: Cắt, ghép, biên tập video, tạo ảnh thumbnail cho video.",
            "Chăm sóc kênh: Comment tương tác với người xem, các nghiệp vụ promote cho video/kênh.",
            "Phân tích các chỉ số quan trọng trong quản trị kênh: Analytics…"
        ],
        requirements: [
            "Nam/nữ đã hoàn thành xong chương trình học đại học (chấp nhận chờ bằng).",
            "KHÔNG YÊU CẦU KINH NGHIỆM CHUYÊN MÔN",
            "Có thể sử dụng cơ bản Premiere, Photoshop là 1 lợi thế",
            "Tư duy sáng tạo, đưa ra các đề xuất phát triển kênh",
            "Có khả năng bắt trend"
        ],
        benefits: [
            "CÓ CẤP DẤU MỘC THỰC TẬP CHO SINH VIÊN NĂM CUỐI",
            "Học việc 1 tháng: phụ cấp 1tr5/tháng + phụ cấp ăn trưa 30.000đ/ngày (tối đa 1 tháng, làm tốt xem xét từ 2 tuần)",
            "Thử việc (1-2 tháng): hưởng 85% lương cứng 7.000.000đ + trợ cấp ăn trưa 30.000đ/ngày + trợ cấp xăng xe 200.000đ/tháng",
            "Chính thức: 7.000.000đ lương cứng + trợ cấp ăn trưa 30.000đ/ngày + trợ cấp xăng xe 200.000đ/tháng",
            "THƯỞNG kênh từ kênh youtube của công ty (3–4tr/tháng) => Tổng thu nhập 10.000.000–15.000.000đ"
        ],
        workingAddress: ["Hà Nội: Số 157 Cầu Diễn, Phú Diễn, Bắc Từ Liêm"],
        workingTime: ["Thứ 2 – Thứ 6 (từ 08:15 đến 17:30)"]
    },
    {
        id: 3,
        experience: 'Không yêu cầu',
        thumbnail: "/shopee.png",
        name: "Thực tập sinh Sale",
        address: "Hà Nội",
        salary: "Lên đến 3 triệu",
        category: "Sale",
        company: "Shopee",
        descriptions: [
            "Quản trị hệ thống kênh Youtube của công ty.",
            "Tạo kênh, đăng tải video lên hệ thống kênh quản lý theo kế hoạch.",
            "Chỉnh sửa video: Cắt, ghép, biên tập video, tạo ảnh thumbnail cho video.",
            "Chăm sóc kênh: Comment tương tác với người xem, các nghiệp vụ promote cho video/kênh.",
            "Phân tích các chỉ số quan trọng trong quản trị kênh: Analytics…"
        ],
        requirements: [
            "Nam/nữ đã hoàn thành xong chương trình học đại học (chấp nhận chờ bằng).",
            "KHÔNG YÊU CẦU KINH NGHIỆM CHUYÊN MÔN",
            "Có thể sử dụng cơ bản Premiere, Photoshop là 1 lợi thế",
            "Tư duy sáng tạo, đưa ra các đề xuất phát triển kênh",
            "Có khả năng bắt trend"
        ],
        benefits: [
            "CÓ CẤP DẤU MỘC THỰC TẬP CHO SINH VIÊN NĂM CUỐI",
            "Học việc 1 tháng: phụ cấp 1tr5/tháng + phụ cấp ăn trưa 30.000đ/ngày (tối đa 1 tháng, làm tốt xem xét từ 2 tuần)",
            "Thử việc (1-2 tháng): hưởng 85% lương cứng 7.000.000đ + trợ cấp ăn trưa 30.000đ/ngày + trợ cấp xăng xe 200.000đ/tháng",
            "Chính thức: 7.000.000đ lương cứng + trợ cấp ăn trưa 30.000đ/ngày + trợ cấp xăng xe 200.000đ/tháng",
            "THƯỞNG kênh từ kênh youtube của công ty (3–4tr/tháng) => Tổng thu nhập 10.000.000–15.000.000đ"
        ],
        workingAddress: ["Hà Nội: Số 157 Cầu Diễn, Phú Diễn, Bắc Từ Liêm"],
        workingTime: ["Thứ 2 – Thứ 6 (từ 08:15 đến 17:30)"]
    },
    {
        id: 4,
        experience: 'Không yêu cầu',
        thumbnail: "/fpt.png",
        name: "Thực tập sinh Marketing",
        address: "Hà Nội",
        salary: "Lên đến 3 triệu",
        category: "Marketing",
        company: "FPT Software",
        descriptions: [
            "Quản trị hệ thống kênh Youtube của công ty.",
            "Tạo kênh, đăng tải video lên hệ thống kênh quản lý theo kế hoạch.",
            "Chỉnh sửa video: Cắt, ghép, biên tập video, tạo ảnh thumbnail cho video.",
            "Chăm sóc kênh: Comment tương tác với người xem, các nghiệp vụ promote cho video/kênh.",
            "Phân tích các chỉ số quan trọng trong quản trị kênh: Analytics…"
        ],
        requirements: [
            "Nam/nữ đã hoàn thành xong chương trình học đại học (chấp nhận chờ bằng).",
            "KHÔNG YÊU CẦU KINH NGHIỆM CHUYÊN MÔN",
            "Có thể sử dụng cơ bản Premiere, Photoshop là 1 lợi thế",
            "Tư duy sáng tạo, đưa ra các đề xuất phát triển kênh",
            "Có khả năng bắt trend"
        ],
        benefits: [
            "CÓ CẤP DẤU MỘC THỰC TẬP CHO SINH VIÊN NĂM CUỐI",
            "Học việc 1 tháng: phụ cấp 1tr5/tháng + phụ cấp ăn trưa 30.000đ/ngày (tối đa 1 tháng, làm tốt xem xét từ 2 tuần)",
            "Thử việc (1-2 tháng): hưởng 85% lương cứng 7.000.000đ + trợ cấp ăn trưa 30.000đ/ngày + trợ cấp xăng xe 200.000đ/tháng",
            "Chính thức: 7.000.000đ lương cứng + trợ cấp ăn trưa 30.000đ/ngày + trợ cấp xăng xe 200.000đ/tháng",
            "THƯỞNG kênh từ kênh youtube của công ty (3–4tr/tháng) => Tổng thu nhập 10.000.000–15.000.000đ"
        ],
        workingAddress: ["Hà Nội: Số 157 Cầu Diễn, Phú Diễn, Bắc Từ Liêm"],
        workingTime: ["Thứ 2 – Thứ 6 (từ 08:15 đến 17:30)"]
    },
    {
        id: 5,
        experience: 'Không yêu cầu',
        thumbnail: "/cmc.png",
        name: "Thực tập sinh Marketing",
        address: "Hà Nội",
        salary: "Lên đến 3 triệu",
        category: "Marketing",
        company: "CMC Global",
        descriptions: [
            "Quản trị hệ thống kênh Youtube của công ty.",
            "Tạo kênh, đăng tải video lên hệ thống kênh quản lý theo kế hoạch.",
            "Chỉnh sửa video: Cắt, ghép, biên tập video, tạo ảnh thumbnail cho video.",
            "Chăm sóc kênh: Comment tương tác với người xem, các nghiệp vụ promote cho video/kênh.",
            "Phân tích các chỉ số quan trọng trong quản trị kênh: Analytics…"
        ],
        requirements: [
            "Nam/nữ đã hoàn thành xong chương trình học đại học (chấp nhận chờ bằng).",
            "KHÔNG YÊU CẦU KINH NGHIỆM CHUYÊN MÔN",
            "Có thể sử dụng cơ bản Premiere, Photoshop là 1 lợi thế",
            "Tư duy sáng tạo, đưa ra các đề xuất phát triển kênh",
            "Có khả năng bắt trend"
        ],
        benefits: [
            "CÓ CẤP DẤU MỘC THỰC TẬP CHO SINH VIÊN NĂM CUỐI",
            "Học việc 1 tháng: phụ cấp 1tr5/tháng + phụ cấp ăn trưa 30.000đ/ngày (tối đa 1 tháng, làm tốt xem xét từ 2 tuần)",
            "Thử việc (1-2 tháng): hưởng 85% lương cứng 7.000.000đ + trợ cấp ăn trưa 30.000đ/ngày + trợ cấp xăng xe 200.000đ/tháng",
            "Chính thức: 7.000.000đ lương cứng + trợ cấp ăn trưa 30.000đ/ngày + trợ cấp xăng xe 200.000đ/tháng",
            "THƯỞNG kênh từ kênh youtube của công ty (3–4tr/tháng) => Tổng thu nhập 10.000.000–15.000.000đ"
        ],
        workingAddress: ["Hà Nội: Số 157 Cầu Diễn, Phú Diễn, Bắc Từ Liêm"],
        workingTime: ["Thứ 2 – Thứ 6 (từ 08:15 đến 17:30)"]
    }
]
