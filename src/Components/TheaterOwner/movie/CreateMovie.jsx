// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Movie.css";

const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Science Fiction",
  "Thriller",
  "Other",
];

const CreateMovie = () => {
  const { register, handleSubmit } = useForm();
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleGenreChange = (genre) => {
    setSelectedGenres((prevGenres) => {
      if (prevGenres.includes(genre)) {
        return prevGenres.filter((selectedGenre) => selectedGenre !== genre);
      } else {
        return [...prevGenres, genre];
      }
    });
  };
  const onSubmit = async (data) => {
    try {
      if (!data.movieImg[0]) {
        throw new Error("No file selected");
      }

      const formData = new FormData();
      formData.append("movieImg", data.movieImg[0]);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("rating", data.rating);
      formData.append("releaseDate", data.releaseDate);
      formData.append("duration", data.duration);
      formData.append("genre", JSON.stringify(selectedGenres));

      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const apiUrl = "http://localhost:3000/api/v1/movie/addmovie";
      console.log("API URL:", apiUrl);

      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // Ensure credentials are included in requests
      });

      console.log(response);
      sessionStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error("Error submitting the form:", error);

      // Something else caused the error
      console.error("Error message:", error.message);
    }
  };

  return (
    <div className="col-sm-9 container create-movie">
      <div className="row d-flex justify-content-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="createmovieForm col-sm-12 col-md-6 d-flex justify-content-center align-items-center flex-column align-content-center m-4"
        >
          <h4 className="mt-3">CREATE MOVIE</h4>
          <input
            {...register("movieImg")}
            type="file"
            name="movieImg"
            className="movieimg createmovie-input"
          />
          <input
            {...register("title")}
            placeholder="Title"
            className="title createmovie-input"
          />
          <input
            {...register("description")}
            placeholder="Description"
            className="description createmovie-input"
          />
          <input
            {...register("rating")}
            placeholder="Rating"
            type="number"
            className="rating createmovie-input"
          />
          <input
            {...register("releaseDate")}
            placeholder="Release Date"
            type="date"
            className="releaseDate createmovie-input"
          />
          <input
            {...register("duration")}
            placeholder="Duration"
            type="number"
            className="duration createmovie-input"
          />

          <div className="genre">
            {genres.map((genre) => (
              <label key={genre}>
                <input
                  type="checkbox"
                  value={genre}
                  checked={selectedGenres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                />
                {genre}
              </label>
            ))}
          </div>

          <input type="submit" className="submit" />
        </form>
      </div>
    </div>
  );
};

export default CreateMovie;
