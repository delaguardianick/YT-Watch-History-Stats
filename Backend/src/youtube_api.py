
import json
import requests

class YoutubeApi:

    def get_watch_history():
        path = r"C:\Users\Gordak\Documents\Nick\Personal\Data\Takeout\YouTube and YouTube Music\history"
        file = "\watch-history.json"

        f = open(path + file, encoding="utf8")
        watchHistory = json.load(f)
        return watchHistory

    def api_get_video_details(self, video_ids_to_query):
        api_key = YoutubeApi.get_api_key()
        request_url = f"https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id={video_ids_to_query}&key={api_key}"
        video_details = requests.get(request_url).json()

        return video_details

    def get_api_key():
        api_key = "AIzaSyCQS1F5f156XRloC3ubBTR6YOO0GcHDO58"
        return api_key