import { test, expect } from "@playwright/test"
import bookingData from "./testData/bookingData.json"

test.describe.configure({ mode: 'serial' })

let bookingId: number
let token: string

//Generating token
test("Generate Token", async ({ request }) => {

    const response = await request.post("https://restful-booker.herokuapp.com/auth", {
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            username: "admin",
            password: "password123"
        }
    })

    const body = await response.json()

    token = body.token

    console.log("TOKEN:", token)

    expect(response.status()).toBe(200)
    expect(token).toBeTruthy()
})

//get booking id
test("Get Booking IDs", async ({ request }) => {

    const response = await request.get("https://restful-booker.herokuapp.com/booking")
    const body = await response.json()

    console.log("All IDs:", body)

    expect(response.status()).toBe(200)
    expect(Array.isArray(body)).toBeTruthy()
    expect(body.length).toBeGreaterThan(0)
})

//get specific booking id
test("Get Booking by ID", async ({ request }) => {

    const response = await request.get(`https://restful-booker.herokuapp.com/booking/1`)
    const body = await response.json()

    console.log("Booking Details:", body)

    expect(response.status()).toBe(200)
    expect(body).toHaveProperty("firstname")
    expect(body).toHaveProperty("lastname")
})

//create booking
test("Create Booking", async ({ request }) => {

    const response = await request.post("https://restful-booker.herokuapp.com/booking", {
        headers: {
            "Content-Type": "application/json"
        },
        data: bookingData.createBooking
    })

    const body = await response.json()

    console.log("Created Booking:", body)

    expect(response.status()).toBe(200)
    expect(body.bookingid).toBeTruthy()

    expect(body.booking.firstname).toBe(bookingData.createBooking.firstname)

    bookingId = body.bookingid

    console.log("Bookingid:", bookingId)
})

//update booking
test("Update Booking", async ({ request }) => {

    const response = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
        headers: {
            "Content-Type": "application/json",
            "Cookie": `token=${token}`
        },
        data: bookingData.updateBooking
    })

    console.log("STATUS:", response.status())

    if (response.status() !== 200) {
        console.log("ERROR:", await response.text())
        return
    }

    const body = await response.json()

    console.log("Updated Booking:", body)

    expect(response.status()).toBe(200)

    expect(body.firstname).toBe(bookingData.updateBooking.firstname)
    expect(body.lastname).toBe(bookingData.updateBooking.lastname)
    expect(body.totalprice).toBe(bookingData.updateBooking.totalprice)

    expect(body).toMatchObject(bookingData.updateBooking)
})

//partial update booking
test("Partial Update Booking", async ({ request }) => {

    const response = await request.patch(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
        headers: {
            "Content-Type": "application/json",
            "Cookie": `token=${token}`
        },
        data: bookingData.partialUpdateBooking
    })

    console.log("STATUS:", response.status())

    if (response.status() !== 200) {
        console.log("ERROR:", await response.text())
        return
    }

    const body = await response.json()

    console.log("Partially Updated Booking:", body)

    expect(response.status()).toBe(200)

    expect(body.firstname).toBe("PartialName")
    expect(body.lastname).toBe("UpdatedLast")
})