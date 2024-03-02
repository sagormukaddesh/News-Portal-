const loadCategory = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`)
    const data = await res.json();
    const newsCategory = data.data;
    const categoryContainer = document.getElementById('category-bar-container');

    newsCategory.news_category?.forEach((singleCategory) => {
        const div = document.createElement('div');
        div.innerHTML = `<button  onclick="loadNews('${singleCategory.category_id}')" class=" m-3 btn-ghost font-extrabold text-white uppercase "> ${singleCategory.category_name}</button>`;
        categoryContainer.appendChild(div); 
    });
}

const loadNews = async (catId) => {
    document.getElementById('loading-spinner').classList.remove('hidden')
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${catId}`);
    const data = await res.json();
    const allNews = data.data;
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    allNews.forEach(news => {
        document.getElementById('loading-spinner').classList.add('hidden')
        const div = document.createElement('div');
        div.innerHTML = `
      <div class="category-items-container  ">
        <div class="hero  bg-slate-300 rounded-xl lg:w-[70%] mb-10 mx-auto">
            <div class="hero-content  flex-col lg:flex-row">
                <img src=${news.image_url}
                    class="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 class="text-3xl font-bold">${news.title.slice(0, 30)} </h1>
                    <div class="flex mt-2 font-bold text-xl">
                    <h3>Rating: ${news.rating.badge} -<sup> ${news.rating.number}  </sup></h3>
                     
                    </div>
                    <p class="py-6">${news.details.slice(0, 100)}</p>
                    <div class="flex justify-between">
                        <div class="avatar">
                            <div class="w-16 rounded-full">
                                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <button class="btn btn-info px-10 ">Details</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
      `;
        newsContainer.appendChild(div);

    })

}

const handleSearch = () => {
    const value = document.getElementById('search-box').value;
    if (value) {
        loadNews(value);
    }else{
        alert('please enter a valid id');
    }
}




loadNews();


loadCategory();

