import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { stories } from "../data/stories";
import { Calendar, MapPin, ArrowLeft, ThumbsUp, Flag } from "lucide-react";

export default function StoryDetail() {
  const { id } = useParams();
  const story = useMemo(() => stories.find((s) => String(s.id) === id), [id]);
  const [comments, setComments] = useState([]);

  if (!story) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-4xl mx-auto text-center text-gray-400">
          未找到该故事。
        </div>
      </div>
    );
  }

  const addComment = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const content = form.content.value.trim();
    if (!content) return;
    const isPinned = form.pinned.checked;
    const isVisible = form.visible.checked;
    const payload = {
      id: Date.now(),
      content,
      pinned: isPinned,
      visible: isVisible,
      likes: 0,
      createdAt: new Date().toISOString(),
    };
    setComments((prev) => {
      const next = [...prev, payload];
      next.sort((a, b) => (a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1));
      return next;
    });
    form.reset();
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4 text-gray-400">
          <Link
            to="/stories"
            className="inline-flex items-center gap-2 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" /> 返回故事列表
          </Link>
        </div>

        <div className="glass-effect rounded-2xl overflow-hidden">
          <img
            src={story.coverImage}
            alt={story.title}
            className="w-full h-[360px] object-cover"
          />
          <div className="p-6 md:p-10">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              {story.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {story.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {story.date}
              </span>
            </div>

            {/* Content blocks (demo) */}
            <div className="prose prose-invert max-w-none">
              <p>
                这一段记录了旅程的起点、天气与当时的心境。你可以在这里写长文，讲述细节。
              </p>
              <p>支持插入图片：</p>
            </div>

            <div className="my-6 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600"
                alt="inline"
                className="w-full h-auto"
              />
            </div>

            <div className="prose prose-invert max-w-none">
              <p>也可以插入视频（示例使用 iframe）：</p>
            </div>
            <div className="aspect-video w-full rounded-xl overflow-hidden my-6">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/Scxs7L0vhZ4"
                title="Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="prose prose-invert max-w-none">
              <p>
                最后以一段感悟收尾。你也可以在这里继续添加更多模组化的内容块。
              </p>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="mt-12">
          <h2 className="text-2xl font-serif font-bold mb-4">留言评论</h2>
          <form
            onSubmit={addComment}
            className="glass-effect rounded-xl p-4 mb-6"
          >
            <textarea
              name="content"
              rows={4}
              placeholder="写点什么..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 mb-3"
            />
            <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-400">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  name="visible"
                  defaultChecked
                  className="accent-teal-400"
                />{" "}
                评论可见
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  name="pinned"
                  className="accent-teal-400"
                />{" "}
                置顶
              </label>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-accent-500 text-black font-semibold rounded-lg hover:bg-accent-400"
            >
              发布评论
            </button>
          </form>

          <div className="space-y-3">
            {comments.length === 0 && (
              <div className="text-gray-500">还没有评论，来做第一个吧。</div>
            )}
            {comments
              .filter((c) => c.visible)
              .map((c) => (
                <div key={c.id} className="glass-effect rounded-xl p-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    {c.pinned && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent-500/20 text-accent-300 rounded-full">
                        <Flag className="w-3 h-3" /> 置顶
                      </span>
                    )}
                    <span>{new Date(c.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-gray-200 mb-3 whitespace-pre-wrap">
                    {c.content}
                  </p>
                  <button
                    className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white"
                    onClick={() =>
                      setComments((prev) =>
                        prev.map((x) =>
                          x.id === c.id ? { ...x, likes: x.likes + 1 } : x
                        )
                      )
                    }
                  >
                    <ThumbsUp className="w-4 h-4" /> 赞 {c.likes}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

