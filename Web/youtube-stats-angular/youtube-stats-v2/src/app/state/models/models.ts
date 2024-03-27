// plots.model.ts
export interface PlotData {
  weekly_avg: string;
  hourly_avg: string;
  monthly_avg: string;
  top_channels: string;
  top_genres: string;
  // top_videos: string;
}

export interface DataState {
  takeoutId: string | undefined;
  userStatistics: Stats | undefined;
  userPlots: PlotData | undefined;
}

// stats.model.ts
export interface Stats {
  takeout_id: string | undefined;
  start_date: string | undefined;
  end_date: string | undefined;
  watch_time_in_hours: number | undefined;
  videos_watched: number | undefined;
  most_viewed_month: string | undefined;
  fav_creator_by_videos: string | undefined;
}

export class StatsFactory {
  static fromApiResponse(data: any): Stats {
    const stats: Stats = {
      takeout_id: data.takeout_id || undefined,
      start_date: data.start_date || undefined,
      end_date: data.end_date || undefined,
      watch_time_in_hours: data.watch_time_in_hours || undefined,
      videos_watched: data.videos_watched || undefined,
      most_viewed_month: data.most_viewed_month || undefined,
      fav_creator_by_videos: data.fav_creator_by_videos || undefined,
    };
    return stats;
  }
}
