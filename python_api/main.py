import json
import time

from fastapi import FastAPI
from fastapi.logger import logger
from fastapi.middleware.cors import CORSMiddleware
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
import sys

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

chrome_options = Options()
chrome_options.add_experimental_option("detach", True)
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--disable-extensions")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--disable-notifications")

chrome_driver_path = "/Users/gerardhernandez/code/rollbit-tracker/chromedriver"

def get_id(id, driver):
    api_url = f"https://rollbot.com/public/nft/assets/eth:0x1de7abda2d73a01aa8dca505bdcb773841211daf/{id}"
    print(api_url)
    driver.execute_script(f"window.open('{api_url}');")
    driver.switch_to.window(driver.window_handles[-1])
    content = WebDriverWait(driver, 10).until(lambda driver: driver.find_element(By.TAG_NAME, "pre").text)
    parsed_json = json.loads(content)
    return parsed_json


@app.get("/robots/{id}")
def read_root(id: str):
    t0 = time.time()
    try:
        with webdriver.Chrome(executable_path=chrome_driver_path, options=chrome_options) as driver:
            url = "https://rollbot.com/"
            driver.get(url)
            WebDriverWait(driver, 20).until(lambda driver: driver.get_cookie("validation_id"))

            if driver.get_cookie("validation_id") is not None:
                data = get_id(id, driver)
                t1 = time.time()
                print(f"Time to get data for robot with id {id}: {t1 - t0}")
                return data
            else:
                driver.refresh()
    except Exception as e:
        return {"error": e}
        print("Error")
        print(e)

@app.get("/testing/{id}")
def read_root(id: str):
    t0 = time.time()
    try:
        with webdriver.Chrome(executable_path=chrome_driver_path, options=chrome_options) as driver:
            url = "https://rollbot.com/"
            driver.get(url)
            WebDriverWait(driver, 10).until(lambda driver: driver.get_cookie("validation_id"))

            if driver.get_cookie("validation_id") is not None:
                data = driver.get_cookie("validation_id")
                t1 = time.time()
                print(f"Time to get cookie for robot with id {id}: {t1 - t0}")
                return data
            else:
                driver.refresh()
    except Exception as e:
        return {"error": e}
        print("Error")
