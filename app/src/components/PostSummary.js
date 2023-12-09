import React from "react";
import Card from "@leafygreen-ui/card";
import { css } from "@leafygreen-ui/emotion";
import { H3 } from "@leafygreen-ui/typography";
import Badge from "@leafygreen-ui/badge";
import { Link } from "react-router-dom";

const cardStyle = css`
  margin: 1em;
`;

const badgeColors = ["lightgray", "darkgray", "red", "blue", "green", "yellow"];

const getBadgeColor = (tag) => {
  let tagId = tag
    .split("")
    .map((char) => char.charCodeAt(0))
    .reduce((s, a) => s + a, 0) % 6;
  return badgeColors[tagId];
};

export default function PostSummary(props) {
  return (
    <Card className={cardStyle}>
      <H3>{props.title}</H3>
      by {props.author} on {(new Date(props.date)).toLocaleDateString()}<br />
      <Link to={`/post/${props._id}`}>Read More...</Link><br />

      {/* Check if there's an image URL and display it */}
      {props.imageUrl && <img src={props.imageUrl} alt="Post" style={{ maxWidth: '100%', height: 'auto' }} />}

      {props && Array.isArray(props.tags) && props.tags.map((tag) => (
        <React.Fragment key={tag}>
          <Badge variant={getBadgeColor(tag)}>{tag}</Badge>
        </React.Fragment>
      ))}
    </Card>
  );
}
