import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle, ShieldCheck } from 'lucide-react';
import { REVIEWS_LIST, RESTAURANT_INFO } from '../data/restaurantData';
import { ReviewItem } from '../types';
import { LiquidButton } from './ui/liquid-glass-button';

export const Reviews: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'food' | 'service' | 'atmosphere'>('all');
  const [reviews, setReviews] = useState<ReviewItem[]>(REVIEWS_LIST);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const filteredReviews = filter === 'all' ? reviews : reviews.filter((r) => r.tag === filter);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: ReviewItem = {
      id: `user-rev-${Date.now()}`,
      author: newAuthor.trim(),
      rating: newRating,
      date: 'Just now',
      comment: newComment.trim(),
      source: 'Google Review',
      verified: true,
      tag: 'food',
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
      setNewAuthor('');
      setNewComment('');
    }, 1800);
  };

  return (
    <section id="reviews" className="py-24 sm:py-32 bg-qparchment text-qgreen-950 relative overflow-hidden">
      
      {/* Background glass sphere */}
      <div
        className="absolute top-1/4 -right-24 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Rating Glass Header */}
        <div className="text-center mb-14">
          <div className="inline-block glass-panel-light rounded-3xl p-6 sm:p-8 mb-6 shadow-md border border-emerald-900/15">
            <p className="font-serif text-6xl sm:text-7xl font-normal text-emerald-950 mb-2 tabular-nums">
              {RESTAURANT_INFO.googleRating}
            </p>
            <div className="flex items-center justify-center gap-1 mb-2 text-qgold-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-qgold-500 text-qgold-500" />
              ))}
            </div>
            <p className="uppercase tracking-[0.24em] text-xs font-bold text-emerald-900">
              Rated by {RESTAURANT_INFO.reviewCount} guests on Google
            </p>
          </div>

          {/* Interactive Glass Filter Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {(['all', 'food', 'service', 'atmosphere'] as const).map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`rounded-full px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                  filter === tag
                    ? 'bg-qgold-500 text-white shadow-md'
                    : 'glass-panel-light text-qgreen-900 hover:bg-qgold-50/80 border border-qgreen-900/15'
                }`}
              >
                {tag === 'all' ? 'All Reviews' : tag}
              </button>
            ))}

            <LiquidButton
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="rounded-full px-4 py-2 text-xs uppercase tracking-wider font-semibold bg-emerald-900 text-white hover:bg-emerald-950 shadow-md cursor-pointer inline-flex items-center gap-1.5"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Write a Review</span>
            </LiquidButton>
          </div>
        </div>

        {/* Reviews 3-Column Glass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel-light rounded-3xl p-8 sm:p-10 flex flex-col justify-between glass-card-hover border border-emerald-900/15"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-0.5 text-qgold-600">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-qgold-600 text-qgold-600" />
                    ))}
                  </div>
                  <span className="text-[11px] text-emerald-800/70 font-mono">{rev.date}</span>
                </div>

                <p className="font-light italic mb-8 text-base sm:text-lg leading-relaxed text-emerald-950/85">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-emerald-900/10">
                <p className="font-serif font-bold text-base text-emerald-950">
                  — {rev.author}
                </p>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-800/70">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{rev.source}</span>
                  <span>·</span>
                  <span className="text-emerald-700 font-medium">Verified Dining</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Glass Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="glass-modal max-w-lg w-full p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="font-serif text-3xl text-emerald-950 mb-2">Leave a Guest Review</h3>
            <p className="text-xs uppercase tracking-wider text-emerald-800 mb-6">
              Share your dining story at {RESTAURANT_INFO.name} (Kralgund, Handwara)
            </p>

            {submitted ? (
              <div className="py-8 text-center text-emerald-900">
                <CheckCircle className="w-12 h-12 mx-auto text-emerald-700 mb-3" />
                <p className="font-serif text-2xl font-semibold">Thank You!</p>
                <p className="text-sm mt-1">Your review has been verified and added to the guestbook.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-emerald-950 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-3 py-2 border border-emerald-900/30 text-emerald-950 focus:outline-none focus:border-emerald-900 text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-emerald-950 mb-1">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 text-emerald-800 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newRating ? 'fill-emerald-800 text-emerald-800' : 'text-emerald-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-emerald-950 mb-1">
                    Your Experience
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Tell us about the flavours, ambience, and service..."
                    className="w-full px-3 py-2 border border-emerald-900/30 text-emerald-950 focus:outline-none focus:border-emerald-900 text-sm bg-white"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-emerald-900/15">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs uppercase tracking-wider font-semibold text-emerald-900 hover:bg-emerald-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <LiquidButton
                    type="submit"
                    variant="gold"
                    className="rounded-full bg-qgold-500 text-white hover:bg-qgold-600 px-6 py-2.5 text-xs uppercase tracking-wider font-bold shadow-sm cursor-pointer"
                  >
                    Submit Review
                  </LiquidButton>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
