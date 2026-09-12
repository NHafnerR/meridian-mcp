import json
import sys
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


def main():
    for series_id in ("UNRATE", "CPIAUCSL", "FEDFUNDS"):
        request = Request(
            "https://api.meridianapi.io/v1/series/" + series_id,
            headers={"Accept": "application/json"},
        )
        with urlopen(request, timeout=15) as response:
            series = json.load(response)
        observations = [
            point for point in series["observations"]
            if point.get("value") is not None
        ]
        if not observations:
            raise ValueError("No observations for " + series_id)
        latest = max(observations, key=lambda point: point["date"])
        print(json.dumps({
            "id": series_id, "source": series["source"],
            "units": series["units"], **latest,
        }))


if __name__ == "__main__":
    try:
        main()
    except (HTTPError, URLError, TimeoutError, ValueError, KeyError) as error:
        print("Meridian request failed: " + str(error), file=sys.stderr)
        sys.exit(1)
