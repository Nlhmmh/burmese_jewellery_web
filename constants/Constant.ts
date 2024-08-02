export const Constant = {
  apiURL: "http://localhost:8077",

  screens: {
    AdminLogin: "/admin/login",
    AdminDashBoard: "/admin/dashboard",
    AdminUserManagementAdmin: "/admin/user/management/admin",
    AdminUserManagementUser: "/admin/user/management/user",
    AdminCategoryManagement: "/admin/category/management",
    AdminGemManagement: "/admin/gem/management",
    AdminMaterialManagement: "/admin/material/management",
    AdminJewelleryManagement: "/admin/jewellery/management",
    AdminFAQManagement: "/admin/faq/management",
  },

  sorts: {
    asc: "asc",
    desc: "desc",
  },
  limits: [1, 2, 5, 10],
  roles: ["", "staff", "admin"],
  statuss: ["", "active", "locked"],
  dateFormat: "YYYY-MM-DD HH:mm:ss Z ( ddd )",
};
