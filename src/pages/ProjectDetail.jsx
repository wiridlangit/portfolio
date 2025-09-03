import React from "react";
import { useParams } from "react-router-dom";
import { listProyek } from "../data";

const ProjectDetail = () => {
  const { id } = useParams();
  const proyek = listProyek.find((p) => p.id === Number(id));

  if (!proyek) {
    return <div className="text-center mt-32">Project not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-24 bg-zinc-800 p-12 rounded-2xl shadow-2xl">
      <div className="flex flex-col gap-8 items-center">
        <a href={proyek.gambar} target="_blank" rel="noopener noreferrer">
            <img src={proyek.gambar} alt={proyek.nama} className="w-full max-w-3xl rounded-lg shadow-lg cursor-pointer" />
        </a>
        {proyek.gallery && proyek.gallery.length > 1 && (
          <div className="flex flex-col gap-8 w-full items-center">
            {proyek.gallery.slice(1).map((img, idx) => (
              // <img key={idx} src={img} alt={proyek.nama + ' gallery'} className="w-full max-w-3xl rounded-lg shadow-lg" />
              <a href={img} target="_blank" rel="noopener noreferrer">
                <img key={idx} src={img} alt={proyek.nama + ' gallery'} className="w-full max-w-3xl rounded-lg shadow-lg cursor-pointer" />
              </a>
            ))}
          </div>
        )}
        <h1 className="text-4xl font-bold mb-4 text-center">{proyek.nama}</h1>
        <p className="mb-8 text-lg opacity-80 whitespace-pre-line text-center">
          {proyek.deskripsiDetail ? proyek.deskripsiDetail : proyek.desk}
        </p>
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {proyek.tools.map((tool, idx) => (
            <span key={idx} className="py-1 px-4 border border-zinc-500 bg-zinc-600 rounded-md font-semibold text-base">{tool}</span>
          ))}
        </div>
        <a href="/portfolio/" className="text-violet-400 hover:underline text-lg">&larr; Back to Home</a>
      </div>
    </div>
  );
};

export default ProjectDetail;
