"use client";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useForm } from "react-hook-form";
import "./AddTheater.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const CreateScreenPage = () => {
  const tempseatlayout = [
    {
      type: "platinum",
      rows: [
        {
          rowname: "H",
          cols: [
            {
              seats: Array.from({ length: 10 }, (_, i) => ({
                seat_id: (i + 1).toString(),
              })),
            },
            {
              seats: Array.from({ length: 10 }, (_, i) => ({
                seat_id: (i + 1).toString(),
              })),
            },
          ],
        },
        {
          rowname: "G",
          cols: [
            {
              seats: Array.from({ length: 10 }, (_, i) => ({
                seat_id: (i + 1).toString(),
              })),
            },
            {
              seats: Array.from({ length: 10 }, (_, i) => ({
                seat_id: (i + 1).toString(),
              })),
            },
          ],
        },
        {
          rowname: "F",
          cols: [
            {
              seats: Array.from({ length: 10 }, (_, i) => ({
                seat_id: (i + 1).toString(),
              })),
            },
            {
              seats: Array.from({ length: 10 }, (_, i) => ({
                seat_id: (i + 1).toString(),
              })),
            },
          ],
        },
      ],
      price: 500,
    },
    {
      type: "gold",
      rows: [
        {
          rowname: "E",
          cols: [
            {
              seats: Array.from({ length: 10 }, (_, i) => ({
                seat_id: (i + 1).toString(),
              })),
            },
            {
              seats: Array.from({ length: 10 }, (_, i) => ({
                seat_id: (i + 1).toString(),
              })),
            },
          ],
        },
        {
          rowname: "D",
          cols: [
            {
              seats: Array.from({ length: 10 }, (_, i) => ({
                seat_id: (i + 1).toString(),
              })),
            },
            {
              seats: Array.from({ length: 10 }, (_, i) => ({
                seat_id: (i + 1).toString(),
              })),
            },
          ],
        },
        {
          rowname: "C",
          cols: [
            {
              seats: Array.from({ length: 10 }, (_, i) => ({
                seat_id: (i + 1).toString(),
              })),
            },
            {
              seats: Array.from({ length: 10 }, (_, i) => ({
                seat_id: (i + 1).toString(),
              })),
            },
          ],
        },
      ],
      price: 300,
    },
    {
      type: "silver",
      rows: [
        {
          rowname: "B",
          cols: [
            {
              seats: Array.from({ length: 10 }, (_, i) => ({
                seat_id: (i + 1).toString(),
              })),
            },
            {
              seats: Array.from({ length: 10 }, (_, i) => ({
                seat_id: (i + 1).toString(),
              })),
            },
          ],
        },
        {
          rowname: "A",
          cols: [
            {
              seats: Array.from({ length: 10 }, (_, i) => ({
                seat_id: (i + 1).toString(),
              })),
            },
            {
              seats: Array.from({ length: 10 }, (_, i) => ({
                seat_id: (i + 1).toString(),
              })),
            },
          ],
        },
      ],
      price: 150,
    },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      theaterName: "",
      seats: tempseatlayout,
      city: "",
      screenType: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://movie-ticket-bookingapplication-1.onrender.com/theater/createtheater",
        data,
        {
          withCredentials: true,
        }
      );
      console.log(response);

      if (response.status === 201) {
        toast.success("Screen Created Successfully", {
          // position: toast.POSITION.TOP_CENTER,
        });
        reset();
      } else {
        toast.error("Screen Creation Failed", {
          // position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error("Screen creation failed", error);
      toast.error("Screen Creation Failed", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="col-sm-9">
      <div className="formpage row d-flex align-items-center justify-content-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="col-sm-11 col-md-6 createTheater-form d-flex flex-column justify-content-center align-items-center "
        >
          <h3>Add Theater</h3>
          <div className="input-div">
            <input
              {...register("theaterName", { required: "Name is required" })}
              type="text"
              placeholder="Name"
              className="Addtheater-input"
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div className="input-div">
            <input
              {...register("city", { required: "City is required" })}
              type="text"
              placeholder="City"
              className="Addtheater-input"
            />
            {errors.city && <p>{errors.city.message}</p>}
          </div>

          <div className="input-div ">
            Screen Type:
            <div className="screentype">
              <label>
                <input
                  {...register("screenType", {
                    required: "Screen type is required",
                  })}
                  type="radio"
                  value="3D"
                />
                3D
              </label>
              <label>
                <input
                  {...register("screenType", {
                    required: "Screen type is required",
                  })}
                  type="radio"
                  value="2D"
                />
                2D
              </label>
              <label>
                <input
                  {...register("screenType", {
                    required: "Screen type is required",
                  })}
                  type="radio"
                  value="4D"
                />
                4D
              </label>
              <label>
                <input
                  {...register("screenType", {
                    required: "Screen type is required",
                  })}
                  type="radio"
                  value="IMAX"
                />
                IMAX
              </label>
            </div>
            {errors.screenType && <p>{errors.screenType.message}</p>}
          </div>

          <button type="submit" className="createscrean-btn">
            Create Screen
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreateScreenPage;
