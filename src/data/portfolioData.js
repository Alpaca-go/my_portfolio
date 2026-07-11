export const profile = {
  name: "KYRIES / 王琦",
  role: "Brand Identity, Packaging & IP Designer",
  roleCn: "品牌视觉、包装设计与 IP 形象设计",
  about: "专注品牌视觉、包装设计与 IP 形象设计，擅长从概念、视觉系统到应用落地建立完整的品牌体验。",
  availability: "欢迎品牌设计、包装设计与视觉合作。",
  email: "",
  socialLinks: []
};

export const selectedProjects = [
  {
    id: "jointown-aesthetics",
    title: "九州通·九州美学",
    category: "品牌设计",
    year: "",
    cover: "/assets/jointown-detail/hero.png",
    description: "轻医美品牌视觉系统",
    action: "jointown"
  },
  {
    id: "chudao-xiang",
    title: "厨道·湘菜",
    category: "品牌设计",
    year: "",
    cover: "/assets/feng-tang-detail/hero-poster.png",
    description: "餐饮品牌视觉与应用",
    action: "chudao"
  },
  {
    id: "fengtangtang",
    title: "冯堂堂",
    category: "品牌设计",
    year: "",
    cover: "/assets/brand-carousel-71.png",
    description: "品牌形象与角色表达",
    action: "brand"
  }
];

export const categoryLabels = ["品牌设计", "包装设计", "IP 设计"];

export const projectCases = {
  jointown: {
    id: "jointown",
    eyebrow: "轻医美 · BRAND IDENTITY",
    title: "九州通·九州美学",
    subtitle: "品牌设计",
    description: "以孔雀羽翼融合数字光感，塑造精致、科技、温柔并存的轻医美品牌形象。整体视觉强调高级质感与女性优雅气质，传递专业、信任与温度。",
    hero: "/assets/jointown-detail/hero.png",
    heroAlt: "九州美学孔雀主视觉与品牌形象展示",
    meta: [
      ["Client", "九州美学"],
      ["Role", "品牌设计"],
      ["Services", "Brand Identity / VI / Packaging"],
      ["Deliverables", "Logo / Visual System / Applications"]
    ],
    sections: [
      {
        id: "overview",
        number: "01",
        title: "Project Overview",
        titleCn: "项目概览",
        description: "以现有品牌介绍与核心视觉为起点，建立项目的整体阅读语境。",
        layout: "full",
        images: [{ src: "/assets/jointown-detail/brand-overview.png", alt: "九州美学品牌概览" }]
      },
      {
        id: "concept",
        number: "02",
        title: "Brand Concept",
        titleCn: "品牌概念",
        description: "孔雀紫与数字光感共同构成品牌的核心情绪和视觉方向。",
        layout: "two-column",
        images: [
          { src: "/assets/jointown-detail/peacock-violet.png", alt: "九州美学孔雀紫品牌图形" },
          { src: "/assets/jointown-detail/logo-silk.png", alt: "九州美学标志在丝绸材质上的应用" }
        ]
      },
      {
        id: "logo",
        number: "03",
        title: "Logo System",
        titleCn: "标识系统",
        description: "展示标志组合方式、辅助符号和可延展的视觉构成。",
        layout: "two-column",
        images: [
          { src: "/assets/jointown-detail/logo-combination.png", alt: "九州美学品牌标志组合规范" },
          { src: "/assets/jointown-detail/symbol-grid.png", alt: "九州美学辅助符号构成网格" }
        ]
      },
      {
        id: "type-color",
        number: "04",
        title: "Typography & Color",
        titleCn: "字体与色彩",
        description: "字体层级与品牌色共同维持专业、柔和和清晰的阅读体验。",
        layout: "two-column",
        images: [
          { src: "/assets/jointown-detail/typography.png", alt: "九州美学中英文字体规范" },
          { src: "/assets/jointown-detail/color-palette.png", alt: "九州美学品牌色彩系统" }
        ]
      },
      {
        id: "applications",
        number: "05",
        title: "Applications",
        titleCn: "品牌应用",
        description: "视觉系统延展至礼盒、名片、手提袋、空间与导视场景。",
        layout: "gallery",
        images: [
          { src: "/assets/jointown-detail/gift-set.png", alt: "九州美学礼盒包装设计" },
          { src: "/assets/jointown-detail/business-cards.png", alt: "九州美学名片设计" },
          { src: "/assets/jointown-detail/handbag.png", alt: "九州美学手提袋设计" },
          { src: "/assets/jointown-detail/wayfinding.png", alt: "九州美学空间导视系统" },
          { src: "/assets/jointown-detail/storefront.png", alt: "九州美学门店空间应用" }
        ]
      }
    ]
  },
  chudao: {
    id: "chudao",
    eyebrow: "餐饮 · BRAND IDENTITY",
    title: "厨道湘菜",
    subtitle: "品牌设计",
    description: "围绕湘菜头牌与传统技法，结合木色、辣椒与菜品影像，呈现地道浓郁的湖湘风味。",
    hero: "/assets/feng-tang-detail/hero-poster.png",
    heroAlt: "厨道湘菜品牌主海报与视觉形象",
    meta: [
      ["Client", "厨道湘菜"],
      ["Role", "品牌设计"],
      ["Services", "Brand Identity / VI / Packaging"],
      ["Deliverables", "Visual System / Posters / Applications"]
    ],
    sections: [
      {
        id: "overview",
        number: "01",
        title: "Project Overview",
        titleCn: "项目概览",
        description: "从品牌核心信息与视觉全貌开始，建立湘菜品牌的识别基础。",
        layout: "full",
        images: [{ src: "/assets/feng-tang-detail/brand-overview.png", alt: "厨道湘菜品牌视觉概览" }]
      },
      {
        id: "concept",
        number: "02",
        title: "Brand Concept",
        titleCn: "品牌概念",
        description: "传统饮食文化、菜品影像与质朴色彩共同构成品牌情绪。",
        layout: "two-column",
        images: [
          { src: "/assets/feng-tang-detail/reference.png", alt: "厨道湘菜品牌概念参考" },
          { src: "/assets/feng-tang-detail/brand-identity.png", alt: "厨道湘菜品牌识别系统" }
        ]
      },
      {
        id: "identity",
        number: "03",
        title: "Identity System",
        titleCn: "识别系统",
        description: "标志、字体和辅助图形共同保证不同触点上的一致表达。",
        layout: "gallery",
        images: [
          { src: "/assets/feng-tang-detail/dish-logo.png", alt: "厨道湘菜品牌标志" },
          { src: "/assets/feng-tang-detail/typography.png", alt: "厨道湘菜字体规范" },
          { src: "/assets/feng-tang-detail/auxiliary-graphics.png", alt: "厨道湘菜辅助图形系统" }
        ]
      },
      {
        id: "applications",
        number: "04",
        title: "Applications",
        titleCn: "品牌应用",
        description: "视觉系统延展至海报、包装、标签和实体门店。",
        layout: "gallery",
        images: [
          { src: "/assets/feng-tang-detail/poster-series.png", alt: "厨道湘菜系列海报" },
          { src: "/assets/feng-tang-detail/package-boxes.png", alt: "厨道湘菜包装盒设计" },
          { src: "/assets/feng-tang-detail/package-labels.png", alt: "厨道湘菜包装标签设计" },
          { src: "/assets/feng-tang-detail/storefront.png", alt: "厨道湘菜门店空间应用" }
        ]
      }
    ]
  }
};
