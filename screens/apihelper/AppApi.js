import {Get, Post, Put} from "./ApiHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const token = async () => await AsyncStorage.getItem("token")

export const LogoutHandler = (response) => {
    console.log(response);
    /*if (response.status === 403) {
        try {
            AsyncStorage.removeItem("token").then(() => {
            })
        } catch (err) {
        }
    }*/
}
const defaultHeader = async () => {
    return {
        "Authorization": `Token ${await token()}`,
        'content-type': 'application/json'
    }
}
export const LoginApi = (body) => {
    return Post('/api/v1/auth/authenticate', body, {'content-type': 'application/json'})
}

export const GetProfileApi = async () => {
    return Get('/api/v1/profile', await defaultHeader())
}

export const UpdateOwnerProfile = async (body) => {
    return Put("/api/v1/invite/updateProfile", body, await defaultHeader())
}

export const CreateCompanyApi = async (body) => {
    return Post('/api/v1/company/create', body, await defaultHeader())
}


export const CreateEmployeeApi = async (body) => {
    return Post("/api/v1/employee/create", body, await defaultHeader())
}

export const GetListOfEmployees = async () => {
    return Get("/api/v1/employee", await defaultHeader())
}

export const CreateProductApi = async (body) => {
    return Post("/api/v1/products/create", body, await defaultHeader())
}

export const GetListOfProducts = async () => {
    return Get(`/api/v1/products`, await defaultHeader())
}

export const GetListOfCustomer = async () => {
    return Get(`/api/v1/customers`, await defaultHeader())
}

export const UpdateBranchApi = async (branchId, body) => {
    return Put(`/api/v1/branch/${branchId}`, body, await defaultHeader())
}

export const CreateCustomerApi = async (body) => {
    return Post(`/api/v1/customers/create`, body, await defaultHeader())
}

export const UpdateCustomerApi = async (customerId, body) => {
    return Put(`/api/v1/customers/${customerId}`, body, await defaultHeader())
}

export const CreateOrderApi = async (body) => {
    return Post(`/api/v1/orders/create`, body, await defaultHeader())
}
export const UpdateOrderApi = async (orderId, body) => {
    return Put(`/api/v1/orders/` + orderId, body, await defaultHeader())
}
export const GetListOfOrders = async () => {
    return Get(`/api/v1/orders`, await defaultHeader())
}

export const CompleteOrderApi = async (orderId) => {
    return Put(`/api/v1/orders/${orderId}/complete`, null, await defaultHeader())
}

export const CancelOrderApi = async (orderId) => {
    return Put(`/api/v1/orders/${orderId}/cancel`, null, await defaultHeader())
}

export const PayingLaterDeliveryApi = async (orderId, body) => {
    return Put(`/api/v1/orders/${orderId}/payinglater/delivery`, body, await defaultHeader())
}
export const PayingNowDeliveryApi = async (orderId, body) => {
    return Put(`/api/v1/orders/${orderId}/payingnow/delivery`, body, await defaultHeader())
}

export const AddPaymentToOrder =async (orderId, body) => {
    return Post(`/api/v1/payments/${orderId}/addpayment`, body, await defaultHeader())
}

export const GetCreditList =async () => {
    return Get(`/api/v1/credits`, await defaultHeader())
}