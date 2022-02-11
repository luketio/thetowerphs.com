import { Link } from "remix";
import { article } from "@prisma/client";
import { expandCategorySlug, displayDate } from "~/lib/utils";

interface Props {
  article: article,
  category?: boolean,
}

export default function Preview({article, category}: Props) {
	const sentences = article.content.substring(0, 400).split(" ");
	sentences.pop();
	const preview = sentences.join(" ").replace(/[\n\r\t\s]+/g, " ") + "...";

	return(
		<div className="articlePreview">
			<div className="category">
				{category &&
           <Link to={ "/category/" + article.category }>{expandCategorySlug(article.category)}</Link>
				}
			</div>
			<div>
				<Link to={ "/articles/" + article.year + "/" + article.month + "/" + article.category + "/" + encodeURI(article.title) } className="title">{article.title}</Link>
				<span>{ displayDate(article.year, article.month) }</span>
			</div>
			<div className="authors">
				{article.authors.map((author, index) => (
					<Link key={index} to={ "/credit/" + encodeURI(author) } >{author}</Link>
				))}
			</div>
			<div className="preview">
				{preview}
			</div>
		</div>
	);
}