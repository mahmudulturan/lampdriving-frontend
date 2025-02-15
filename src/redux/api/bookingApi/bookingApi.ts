import { IResponseBase, IResponseWithPaginationData } from "@/types/response";
import baseApi from "../baseApi";
import { IBooking, IBookingInputs } from "@/types/booking";

interface IGetAllBookingsQuery {
    status: "pending" | "accepted" | "completed" | "cancelled";
    searchKey: string;
    limit: string;
    page: string;
}

const bookingApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        createABooking: builder.mutation<IResponseBase, IBookingInputs>({
            query: (data) => ({
                url: '/booking',
                method: "POST",
                body: data
            }),
            invalidatesTags: ["booking"]
        }),
        getAllBookings: builder.query<IResponseWithPaginationData<IBooking[]>, IGetAllBookingsQuery>({
            query: ({ status, searchKey, limit, page }) => `/booking/all?status=${status}&populate=instructor.user,learner.user${searchKey && `&searchKey=${searchKey}`}&limit=${limit}&page=${page}`, providesTags: ["booking"]
        }),
        getMyBookings: builder.query<IResponseWithPaginationData<IBooking[]>, IGetAllBookingsQuery>({
            query: ({ status, searchKey, limit, page }) => `/booking/my?status=${status}&populate=instructor.user,learner.user${searchKey && `&searchKey=${searchKey}`}&limit=${limit}&page=${page}`, providesTags: ["booking"]
        }),
        updateBookingStatus: builder.mutation<IResponseBase, { id: string, status: "pending" | "accepted" | "completed" | "cancelled" }>({
            query: ({ id, status }) => ({
                url: `/booking/status/${id}`,
                method: "PATCH",
                body: { status }
            }),
            invalidatesTags: ["booking"]
        })
    })
})


export const { useCreateABookingMutation, useGetAllBookingsQuery, useUpdateBookingStatusMutation, useGetMyBookingsQuery } = bookingApi