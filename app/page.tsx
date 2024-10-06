"use client";

import Navbar from "@/app/components/Navbar";
import Billboard from "@/app/components/Billboard";
import MovieList from "@/app/components/MovieList";
import useMovieList from "@/app/hooks/useMovieList";
import useFavorites from "@/app/hooks/useFavorites";
import InfoModal from "@/app/components/InfoModal";
import useInfoModal from "@/app/hooks/useInfoModal";

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />  
        <MovieList title="My List" data={favorites} />  
      </div>      
    </>    
  );
}