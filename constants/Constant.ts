export const Constant = {
  apiURL: "http://localhost:8077",

  screens: {
    AdminLogin: "/admin/login",
    AdminDashBoard: "/admin/dashboard",
    AdminUserManagementAdmin: "/admin/management/admin",
    AdminUserManagementUser: "/admin/management/user",
    AdminCategoryManagement: "/admin/management/category",
    AdminGemManagement: "/admin/management/gem",
    AdminMaterialManagement: "/admin/management/material",
    AdminJewelleryManagement: "/admin/management/jewellery",
    AdminFAQManagement: "/admin/management/faq",
  },

  sorts: {
    asc: "asc",
    desc: "desc",
  },
  limits: [5, 10],
  dateFormat: "YYYY-MM-DD HH:mm:ss Z",
  mailCheckPattern:
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
};
