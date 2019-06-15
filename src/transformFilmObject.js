const transformFilmObject = (objectData) => ({
  'backgroundColor': objectData.background_color,
  'coverLink': objectData.background_image,
  'description': objectData.description,
  'director': objectData.director,
  'genre': [objectData.genre],
  'id': `${objectData.id}`,
  'favorite': objectData.is_favorite,
  'name': objectData.name,
  'posterImage': objectData.poster_image,
  'posterLink': objectData.preview_image,
  'trailer': objectData.preview_video_link,
  'rating': objectData.rating,
  'released': objectData.released,
  'duration': objectData.run_time,
  'scoresCount': objectData.scores_count,
  'starring': objectData.starring,
  'videoLink': objectData.video_link
});

export default transformFilmObject;
