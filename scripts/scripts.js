const AllSeat = document.querySelectorAll(".carSeat");
const ticketLeft = document.querySelector(".ticketLeft");
const seatCount = document.querySelector(".seatCount");
const seatList = document.querySelector(".seatList");
const totalPrice = document.querySelector(".totalPrice");
const grandTotal = document.querySelector(".grandTotal");
const couponToApply = document.querySelector(".couponInput");
const couponApplyBtn = document.querySelector(".couponApplyBtn");

//variables
const ticketPrice = 550;
const totalSeat = 8;
let selectedSeats = [];
const availableCoupons = [
  { code: "NEW15", amount: 15 },{ code: "Couple 20", amount: 20 }
];

AllSeat.forEach((seat) => {
  seat.addEventListener("click", () => {
    const isSitSelected = selectedSeats.find(
      (item) => item.code === seat.innerText
    );
    seat.classList.toggle("bg-lime-500", !isSitSelected);
    if (isSitSelected) {
      selectedSeats = selectedSeats.filter(
        (item) => item.code !== seat.innerText
      );
    } else {
      selectedSeats.push({
        code: seat.innerText,
        class: "economy",
        price: 550,
      });
    }

    //dom manipulation
    let list = "";
    const total = selectedSeats.reduce(
      (total, current) => total + current.price,
      0
    );
    const useCoupon = availableCoupons.find(
      (item) => item.code === couponToApply?.value
    );
    const discount = useCoupon?.amount ? total * (useCoupon.amount / 100) : 0;

    selectedSeats.forEach((item) => {
      list += `<li class="text-[#03071299] font-normal text-base flex justify-between w-full">
                  <p>${item.code}</p>
                  <p>${item.class}</p>
                  <p>BDT ${item.price}</p>
                </li>`;
    });
    // append seats in the pricing area
    seatList.innerHTML = list;

    ticketLeft.innerText = totalSeat - selectedSeats.length;
    totalPrice.innerText = "BDT " + total;
    grandTotal.innerText = "BDT " + (total - discount.toFixed(2));
    seatCount.innerText = selectedSeats.length;
  });
});

couponApplyBtn.addEventListener("click", () => {
  const total = selectedSeats.reduce(
    (total, current) => total + current.price,
    0
  );
  const useCoupon = availableCoupons.find(
    (item) => item.code === couponToApply?.value
  );
  const discount = useCoupon?.amount ? total * (useCoupon.amount / 100) : 0;
  grandTotal.innerText = "BDT " + (total - discount.toFixed(2));
});
