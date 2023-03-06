import time

# import youtube_api as youtube_api
from Youtube_Analysis_Service import PlotsService as Plots

# from matplotlib.figure import Figure
from fastapi import FastAPI
import matplotlib.pyplot as plt
import base64
import io
from fastapi.responses import StreamingResponse
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
plots = None


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/yt-plot")
def get_youtube_plot():
    plot = Plots.plot_weekly_avg()
    # return 'render_template('yt-plot.html', plot=plot)'
    return {"GGOTEEMMM<3": "GGOTEEMMM3"}


@app.get("/plots/all")
async def get_all_plots():
    plots = Plots.get_all_plots(Plots)
    return JSONResponse(content=plots)


@app.get("/plots/weekly_avg")
async def get_plot_weekly_avg():
    plots = Plots.get_all_plots(Plots)
    return JSONResponse(content=plots)


# # http://localhost:8000/plot
# @app.get("/plot")
# async def get_plot():
#     plot = Plots.plot_weekly_avg()

#     # Render the plot as an image
#     fig = plot.get_figure()
#     canvas = FigureCanvas(fig)
#     png_output = io.BytesIO()
#     canvas.print_png(png_output)

#     # Convert the binary data to a base64-encoded string
#     png_output.seek(0)
#     png_base64 = base64.b64encode(png_output.getvalue()).decode("utf-8")

#     return JSONResponse(content={"plot_url": f"data:image/png;base64,{png_base64}"})

#     # return StreamingResponse(png_output, media_type="image/png")


if __name__ == "__main__":
    print("Starting API")
    # get_info_db()
