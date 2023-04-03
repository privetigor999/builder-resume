import React, { FC } from "react";
import { ThumbUp, ThumbDown } from "@mui/icons-material";

import "./helper.scss";
import { IHelpers } from "../../types/types";

interface IHelperProps {
  helpers: IHelpers;
}

export const Helper: FC<IHelperProps> = ({ helpers }) => {
  if (helpers === undefined) {
    return;
  }
  return (
    <aside className="helper">
      <h5>Рекомендации:</h5>
      <ul>
        {helpers?.map((helper, i) => (
          <li key={i} className="helper__item">
            <p>
              {helper.title}. <span>{helper?.comment}</span>
            </p>
            {helper?.goodExample && (
              <div className="helper__goodExample">
                <ThumbUp sx={{ fill: "green" }} />
                <i>{helper.goodExample}</i>
              </div>
            )}

            {helper?.badExample && (
              <div className="helper__badExample">
                <ThumbDown sx={{ fill: "red" }} />
                <i>{helper.badExample}</i>
              </div>
            )}

            {helper?.goodPhotoExample && (
              <div className="helper__goodPhotoExample">
                <ThumbUp sx={{ fill: "green" }} />
                <img src={helper.goodPhotoExample} alt="photo1" />
              </div>
            )}

            {helper?.badPhotoExample && (
              <div className="helper__badPhotoExample">
                <ThumbDown sx={{ fill: "red" }} />
                <img src={helper.badPhotoExample} alt="photo2" />
              </div>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};
