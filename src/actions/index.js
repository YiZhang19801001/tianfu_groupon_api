import types from "./actionTypes";
import { setCategory, setOptions } from "./newProduct";
import { fetchShop } from "./shop";
import Report from "./report";
import Category from "./category";
import kidsnParty from "../apis/kidsnParty";
import Product from "./product";
import Option from "./option";
import Shop from "./shop";
import Order from "./Order";
import User from "./User";
import Customer from "./Customer";
import Staff from "./Staff";
import SalesGroup from "./SalesGroup";
import App from "./App.js";
import Auth from "./Auth.js";

// produt actions
export const getProducts = Product.index;
export const getProduct = Product.show;
export const updateProduct = Product.update;
export const switchProductStatus = Product.switchProductStatus;
export const createNewProduct = Product.create;
export const setProductImage = Product.setImage; //support upload image
export const setNewProductCategory = setCategory; //support create product
export const setNewProductOptions = setOptions; //support create product
export const removeOptionsFromNewProduct = Product.removeOption; //support create product
export const searchByName = Product.search; // search
export const setNewProdutStore = Product.setLocation;

//category actions
export const setSelectedCategory = Category.select;
export const createNewCategory = Category.create;
export const updateCategory = Category.update;
export const fetchAvaliableCategories = Category.index;
export const deleteCategory = Category.remove;
export const fetchSingleCategory = Category.show;
export const setSelectCategoryImage = Category.setImage;
export const activeCategory = Category.active;

//options actions
export const fetchOptions = Option.index;
export const selectOption = Option.select;
export const createNewOption = Option.create;
export const updateOption = Option.update;

export const initApp = () => {
  return async function(dispatch) {
    const language_id = localStorage.getItem("Aupos_language_id");
    const response = await kidsnParty.get(`/init/${language_id}`);

    dispatch({ type: types.initApp, payload: response.data });
  };
};

// order actions
export const getOrders = Order.index;
export const selectOrder = Order.show;
export const updateOrder = Order.update;
export const updateOrderStatus = Order.patch;
export const markingOrder = Order.marking;
export const fetchOrdersByStore = Order.fetchByStore;

export const fetchOrderBySingleStore = Order.fetchBySingleStore;
export const onCustomerOrderListPageChange = Order.onPageChange;
export const searchingOrders = Order.search;
export const advSearchingOrders = Order.advSearch;
export const fetchProductOrderDetails = Order.fetchbyProducts;
export const fetchOrderProductsList = Order.fetchOrderProductsList;

// shop actions
export const fetchSingleShop = fetchShop;
export const changeSelectedShop = Shop.patch;
export const createShop = Shop.create;
export const updateShop = Shop.update;
export const handleDateChange = Shop.handleDateChange;
export const getShops = Shop.index;
export const inactiveShop = Shop.remove;
export const activeShop = Shop.active;

// reports actions
export const fetchReportsSummary = Report.fetchSummary;
export const setStartDate = Report.setStartDate;
export const setEndDate = Report.setEndDate;
export const fetchReportDetails = Report.show;
export const setReportCategory = Report.setCategory;
export const sortReportDetails = Report.sortDetails;

// user acitons
export const fetchUsers = User.index;

// customer actions
export const fetchCustomers = Customer.index;
export const fetchCustomer = Customer.show;
export const createCustomer = Customer.create;
export const updateCustomer = Customer.update;
export const sortCustomerDetails = Customer.sortDetails;
// staff actions
export const fetchStaffs = Staff.index;
export const fetchStaff = Staff.show;
export const createStaff = Staff.create;
export const updateStaff = Staff.update;
export const sortStaffDetails = Staff.sortDetails;

// sales group actions
export const fetchSalesGroups = SalesGroup.index;
export const fetchSalesGroup = SalesGroup.show;
export const createSalesGroup = SalesGroup.store;
export const updateSalesGroup = SalesGroup.update;

// app actions
export const setPeriod = App.setPeriod;
export const setGlobalStartDate = App.setStartDate;
export const setGlobalEndDate = App.setEndDate;

// Auth actions
export const userLogin = Auth.login;
export const checkLogin = Auth.check;

// export action types
export const actionTypes = types;
