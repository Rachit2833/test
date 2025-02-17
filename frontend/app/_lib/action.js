'use server'

import  {revalidatePath } from "next/cache";


export async function addTransaction(formData) {
  try {
    const dataObject = {};
    for (const [key, value] of formData.entries()) {
      dataObject[key] = value;
    }
    dataObject["userID"] = "65b3e1d2c5a4e6a2b3c9d2e2";

    console.log(dataObject);

    const response = await fetch("http://localhost:2833/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObject),
    });
    if (response.ok) {
      console.log("Transaction added successfully.");
      revalidatePath("/");
    } else {
      console.error("Failed to add transaction:", response.statusText);
    }
  } catch (error) {
    console.error("Error adding transaction:", error);
  }
}

export async function deleteTransction(transactionId) {
  try {
    const data = await fetch(
      `http://localhost:2833/transaction/${transactionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    revalidatePath("/")
  } catch (error) {
    console.error(error);
  }
}
export async function updateTransaction(formData, id) {
    try {
        // Convert FormData to a plain object
        const dataObject = Object.fromEntries(formData.entries());

        const response = await fetch(`http://localhost:2833/transactions/${id}`, {
            method: "PATCH",
            body: JSON.stringify(dataObject),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to update: ${response.statusText}`);
        }

        revalidatePath("/");
    } catch (error) {
        console.error("Error updating transaction:", error);
    }
}
