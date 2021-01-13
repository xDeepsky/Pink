let FotoFilter = () => {

let uploadOverlay = document.querySelector('.upload-overlay'),
    imagePreview = document.querySelector('.image-preview'),
    openButton = document.querySelector('.upload-file'),
    resetButton = document.querySelector('.button__reset'),
    formInputFile = document.querySelector('.form-input'),
    uploadButton = document.querySelector('.button__post'),
    confirmButton = document.querySelector('.upload-submit'),
    userComment = document.querySelector('.input__user-comment'),
    userName = document.querySelector('.input__user-name'),
    blurFilter = 0,
    sepiaFilter = 0,
    hueRotateFilter = 0;
let filter = '';
let fileChooser = document.querySelector('[type="file"]');

let hueRotate = document.querySelector('.icon-hueRotate'),
    sepia = document.querySelector('.icon-sepia'),
    blur = document.querySelector('.icon-blur');
    
let sliderHueRotate = document.querySelector('.hueRotate'),
    thumbHueRotate = document.querySelector('.thumb-hueRotate');
let sliderBlur = document.querySelector('.blur'),
    thumbBlur = document.querySelector('.thumb-blur');
let sliderSepia = document.querySelector('.sepia'),
    thumbSepia = document.querySelector('.thumb-sepia');
let styleThumb = `
    left: 0;
    transition: all 0.7s ease;`;
let uploadTime = '';

class UserPhoto {
    constructor(id, name, comment, filter, time, image_src, userLike, favorite) {
        this.id = id;
        this.name = name;
        this.comment = comment;
        this.filter = filter;
        this.time = time;
        this.image_src = image_src;
        this.userLike = userLike;
        this.favorite = favorite;
    } 

    getTimeComment() {
        let t = Date.parse(new Date()) - this.time,
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60)),
            minutes = Math.floor((t / 1000 / 60)),
            seconds = Math.floor((t /1000));

        if (seconds < 60) {
            return this.time = `${seconds} секунд назад`;
        } else if (minutes < 60) {
            if (minutes == 1) {
                return this.time = `${minutes} минута назад`;
            } else if (minutes > 1 && minutes < 5) {
                return this.time = `${minutes} минуты назад`;
            }  else if (minutes >= 5) {
                return this.time = `${minutes} минут назад`;
            }
        } else if (hours <= 23) {
            if (hours == 1) {
                return this.time = `${hours} час назад`;
            } else if (hours > 1 && hours < 5) {
                return this.time = `${hours} часа назад`;
            } else if (hours >= 5) {
                return this.time = `${hours} часов назад`;
            }            
        } else if (days == 1){
            return this.time = `${days} день назад`;
        } else if (days > 1 && days < 5) {
            return this.time = `${days} дня назад`;
        } else if (days >= 5) {
            return this.time = `${days} дней назад`;
        }
    }  
    render() {
        if (!this.elem) {
            this.elem = document.createElement("div");
            this.elem.className = "photo";
            let gallery = document.querySelector(".photo-wrapper--dynamic");
            gallery.append(this.elem);
        }
        
        this.elem.innerHTML = `
            <img style="${this.filter}" src="${this.image_src}">                
            <div class="comment">
                <p class="user-name">${this.name}<span class="comment__time"> (${this.getTimeComment()})</span></p>
                <p class="comment__text">${this.comment}</p>
                <div class="comment__like">
                    <svg class="icon">
                        <use xlink:href="sprite.svg#icon-heart"></use>
                    </svg>Нравится: <input class="amount-like" type="text" value=${this.userLike} disabled>
                </div>
                <button class="deletePhoto" type="button" style="display: none">Удалить</button>
                <label class="favorite"><input type="checkbox" ${this.favorite}><span></span></label>
            </div>
            `;   
        this.elem.querySelector("img").addEventListener('click', (e) => {
            let bigImgContainer = document.querySelector('.big-image');
            bigImgContainer.classList.add('show-bigImg');
            bigImgContainer.innerHTML = `
                <img src="${e.target.src}">
            `;
            bigImgContainer.addEventListener('click', () => {
                bigImgContainer.classList.remove('show-bigImg');
            });
            document.addEventListener('keydown', (e) => {
                if (e.code === 'Escape' && bigImgContainer.classList.contains('show-bigImg')) {
                    bigImgContainer.classList.remove('show-bigImg');
                }
            });
        });
        this.elem.querySelector("[type='checkbox']").addEventListener('click', (e) => {
            if (e.target.checked == true) {
                e.target.value = 'checked';
            } else e.target.value = '';
            let change = {
                'id': this.id,
                'favorite' : e.target.value
            }
            const changeForm = Object.entries(change).reduce((fd, [ key, value ]) => (fd.append(key, value), fd), new FormData);
            fetch('/backend/setFavorite.php', {
                method: "POST",
                body: changeForm,
            })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                } else {
                    console.error("Что-то пошло не так" + response.status)
                }
            })
            .then((result) => {
                if (result == 'ok') {
                    console.log('Успех'); 
                } else {
                    console.log('Провал');
                }
            })
        });
        this.elem.querySelector('.icon').addEventListener('click', (e) => {
            e.preventDefault();
            let change = {
                'id': this.id,
                'userLike' : ++e.target.nextElementSibling.value
            }
            const changeForm = Object.entries(change).reduce((fd, [ key, value ]) => (fd.append(key, value), fd), new FormData);
            fetch('/backend/addLike.php', {
                method: "POST",
                body: changeForm,
            })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                } else {
                    console.error("Что-то пошло не так" + response.status)
                }
                })
            .then((result) => {
                if (result == 'ok') {
                    showLike(); 
                } else {
                    console.log('Провал');
                }
            })
        });
        this.elem.querySelector('.deletePhoto').addEventListener('click', () => {
                this.deletePhoto();
        })
    }    
    deletePhoto() {   
        return new Promise ((resolve, reject) => {
            if (confirm('Вы действительно хотите удалить фото? Это действие необратимо')) {
                fetch(`/backend/deletePhoto_obr.php?id=${this.id}`)
                .then((response) => {
                    if (response.ok) response.text();
                })
                .then((result) => {
                    if (result = 'ok') {
                        this.elem.classList.add('delete');
                        setTimeout(() => {
                            this.elem.remove();
                        },1000); 
                        resolve();                   
                    }else {
                    alert("Не удалось удалить товар");
                    }
                })    
            }
        }).then(() => getPagesAmount());
    }
};

    fileChooser.addEventListener('change', function (e) {           
        uploadOverlay.classList.remove('hidden');
        let FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
        let file = fileChooser.files[0];
        let fileName = file.name.toLowerCase();    
        let matches = FILE_TYPES.some(function (it){
            return fileName.endsWith(it);
        });    
        if (matches) {
            let reader = new FileReader();
    
            reader.addEventListener('load', function () {
                imagePreview.src = reader.result;
            });
            reader.readAsDataURL(file);
        };  
        openButton.style.cssText = `
            display: none;
        `;
        uploadTime = Date.parse(new Date());
    });

    userName.addEventListener('input', function () {
        
        if (userName.value != '' && userName.value.length > 2) {
            confirmButton.disabled = false;
        } else {
            confirmButton.disabled = true;
        }
    });

    confirmButton.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector('.preview').innerHTML = `
        <img src="${imagePreview.src}" class="effect-image">
        `;
        uploadOverlay.classList.add('hidden');
        uploadButton.disabled = false;
    });
    
    resetButton.addEventListener('click', function(evt) {
        evt.preventDefault();
        resetForm();    
        clearFilterValue();
    });

    let btnClose = document.querySelector('.upload-cancel');
    btnClose.addEventListener('click', function () {
        uploadOverlay.classList.add('hidden');
        resetForm();
    });

//----------------------------------------------------------------------
//Слайдер Blur

thumbBlur.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    changeBlur();
});

//Слайдер Sepia

thumbSepia.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    changeSepia();            
});

// Слайдер HueSaturation

thumbHueRotate.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    changeHueRotate();            
});

//-----------------------------------------------------------------------
//----------------Mobail Filter-----------------------------------------
const tools = document.querySelectorAll('.icon-hueRotate, .icon-sepia, .icon-blur'),
    mobailFilterControls = document.querySelectorAll('.mobail-filter-controls');

function hideTools () {
    tools.forEach(tool => {
        tool.classList.remove('tool--active');
    });
    mobailFilterControls.forEach(control => {
        control.classList.remove('show');
    });
};

function showTools (target) {
    target.classList.add('tool--active');
    target.nextElementSibling.classList.add('show');
};

function clearFilterValue () {
    document.querySelector('.effect-image').style = '';
    hueRotateValue.value = 0;
    sepiaValue.value = 0;
    blurValue.value = 0;
};

tools.forEach(tool => {
    tool.addEventListener('click', function (e) {
        e.preventDefault();
        let target = e.currentTarget;
        switch (target) {
            case hueRotate:
                hideTools();
                clearFilterValue();
                showTools(target);
                break;
            case sepia:
                hideTools();
                clearFilterValue();
                showTools(target);
                break;
            case blur:
                hideTools();
                clearFilterValue();
                showTools(target);
                break;                    
        }               
    });
});

let btnFilterPlus = document.querySelectorAll('.filter-button-inc'),
    btnFilterMinus = document.querySelectorAll('.filter-button-dec');      

function filterValueCountPlus (target) {
    if (target.previousElementSibling.value < 100) {
        target.previousElementSibling.value = +target.previousElementSibling.value + 10;
    } else return;
};

function filterValueCountMinus (target) {
    if (target.nextElementSibling.value > 0) {
        target.nextElementSibling.value -= 10;        
    } else return;
};

let hueRotateValue = document.querySelector('.hueRotate-controls-value'),
    sepiaValue = document.querySelector('.sepia-controls-value'),
    blurValue = document.querySelector('.blur-controls-value');

    btnFilterPlus.forEach(btn => {
        btn.addEventListener('click', function (e) {
            let target = e.target;
            let img = document.querySelector('.effect-image');
            if (target.parentElement.classList.contains('mobail-hueRotate')) {
                filterValueCountPlus(target);
                calcHueRotateFilter(img);   
            } else if (target.parentElement.classList.contains('mobail-sepia')) {
                filterValueCountPlus(target);
                calcSepiaFilter(img);
            } else if (target.parentElement.classList.contains('mobail-blur')) {
                filterValueCountPlus(target);
                calcBlurFilter(img);
            }
        });
    });
    btnFilterMinus.forEach(btn => {
        btn.addEventListener('click', function (e) {
            let target = e.target;
            let img = document.querySelector('.effect-image');
            if (target.parentElement.classList.contains('mobail-hueRotate')) {
                filterValueCountMinus(target);
                calcHueRotateFilter(img); 
            } else if (target.parentElement.classList.contains('mobail-sepia')) {
                filterValueCountMinus(target);
                calcSepiaFilter(img);
            } else if (target.parentElement.classList.contains('mobail-blur')) {
                filterValueCountMinus(target);
                calcBlurFilter(img);
            }
        });
    });

    function calcHueRotateFilter (img) {
        let result = hueRotateValue.value;                    
            hueRotateFilter = result * 3.6 + 'deg';
            sepiaFilter = 0;
            blurFilter = 0;
            img.style.cssText = `
                filter: hue-rotate(${hueRotateFilter});
            `;          
    };
    function calcSepiaFilter (img) {
        let result = sepiaValue.value;                    
            sepiaFilter = result + '%';
            blurFilter = 0;
            hueRotateFilter = 0;
            img.style.cssText = `
                filter: sepia(${sepiaFilter});
            `;
    };
    function calcBlurFilter (img) {
        let result = blurValue.value;
            blurFilter = result/8 + 'px';
            sepiaFilter = 0;
            hueRotateFilter = 0;
            img.style.cssText = `
                    filter: blur(${blurFilter});
                `;
    };

//--------------------------------------------------------
// Постим фото в галерею и отправляем на сервер
//--------------------------------------------------------
formInputFile.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (blurFilter != 0) {
        filter = `filter: blur(${blurFilter})`;
    } else if (sepiaFilter != 0) {
        filter = `filter: sepia(${sepiaFilter})`;
    } else if (hueRotateFilter != 0) {
        filter = `filter: hue-rotate(${hueRotateFilter})`;
    }

    let saveName = userName.value.replace(/(\<(\/?[^>]+)>)/g, ''),
    nameUpper = saveName.split('');    
    nameUpper = nameUpper[0].toUpperCase() + saveName.slice(1);
    let saveComment = userComment.value.replace(/(\<(\/?[^>]+)>)/g, '');

    let userPhoto = new UserPhoto(this.id, nameUpper, saveComment, filter, uploadTime, imagePreview.src, 0, '');    
    currentPage = 0;
    addPhoto(userPhoto);
    resetForm();
});

window.addEventListener(`resize`, event => {
    if (window.innerWidth < 1200) {
        resetForm();        
    };
}, false);
//----------------------------------------------------------------------
//---------------FUNCTIONS DECLARATION----------------------------------------------
//              Функция сброса формы
//----------------------------------------------------------------------

function resetForm() {
    fileChooser.value = '';
    document.querySelector('.effect-image').src = `img/photo-road-mobile@1x.jpg`;
    document.querySelector('.effect-image').style = '';
    uploadButton.disabled = true;
    openButton.style.cssText = `
        display: flex;
    `;
    imagePreview.src = "plug.png";
    userName.value = '';
    userComment.value = '';
    thumbHueRotate.style.cssText = styleThumb;  
    thumbBlur.style.cssText = styleThumb;
    thumbSepia.style.cssText = styleThumb;
};

//----------------------------------------------------------------------------------------
//----------------Загрузка галереи--------------------------------------------------------
function loadGallery() {
    return new Promise((resolve, reject) => {
        galleryContainer.innerHTML = '';
            resolve();
    }).then(() => getPagesAmount())
};

//-------------Рендер фото на страницу---------------------------------------------------
function scrollWindow() {
    galleryContainer.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});     
};

function createPhoto(photos) {
    return new Promise ((resolve, reject) => {
        for (let photo of photos) {
            let userPhoto = new UserPhoto(photo.id ,photo.name, photo.comment, photo.filter, photo.time, photo.image_src, photo.userLike, photo.favorite);
            userPhoto.render();
            };
            getEditor();
            resolve();
    }).then(() => scrollWindow());
};
//----------------------------------------------------------------------------
//--------_____PAGINATION____-------------------------------------------------
let galleryContainer = document.querySelector(".photo-wrapper--dynamic");
let pages = 0;

//-------------Вычисляем кол-во страниц в галерее---------------------------------------------------

function getPagesAmount() {
    return new Promise((resolve, reject) => { 
        fetch('/backend/getAllPhotos.php')
            .then((response) => {
            if (response.ok) return response.json();
            else console.error("Ошибка" + response.status);
            })
            .then((result) => {
                pages = Math.ceil(result.length / 12);
                resolve(pages);
            }); 
    }).then((pages) => createLinkPages(pages))
};

//-------------Добавляем ссылки на страницу-------------------------------------------------------------

let linkContainer = document.querySelector('.gallery__pages');
function createLinkPages(pages){  
    return new Promise((resolve,reject) => {
        linkContainer.innerHTML = '';
        for (let i = 1; i <= pages; i++) {
            linkContainer.innerHTML += `
            <a href="#"><span>${i}</span></a>
            `;
        }
        resolve();
    }).then(() => Pagination());   
};

function clearActive() {  //Очищаем класс активности у ссылок
    linkContainer.querySelectorAll('a').forEach(link => {
        link.classList.remove('link--active');
    });
};
let currentPage = 0;
function Pagination() {
    let links = linkContainer.querySelectorAll('a');
    if (currentPage) {
        links[currentPage].classList.add('link--active');  
    } else {
        links[0].classList.add('link--active');
    }
    fetch(`/backend/pagination.php/?page=${currentPage + 1}`)
            .then((response) => {
            if (response.ok) return response.json();
            else console.error("Ошибка" + response.status);
            })
            .then((result) => {
                galleryContainer.innerHTML = '';
                createPhoto(result)
            });
    links.forEach((link, i, links) => {
        link.addEventListener('click', function(e) {
            clearActive();
            getEditor();
            galleryContainer.innerHTML = '';        
            e.preventDefault();           
            link.classList.add('link--active');
            link.disabled = true;
            currentPage = i;
            console.log(currentPage)
            fetch(`/backend/pagination.php/?page=${i + 1}`)
            .then((response) => {
            if (response.ok) return response.json();
            else console.error("Ошибка" + response.status);
            })
            .then((result) => createPhoto(result)); 
        });
    });
};

//----------------------------------------------------------------------------------------
//     Функция для отправки пользовательских данных и фото на сервер

function addPhoto(form) {
    const formData = Object.entries(form).reduce((fd, [ key, value ]) => (fd.append(key, value), fd), new FormData);
    return new Promise((resolve, reject) => {   
        fetch("/backend/addPhoto_obr.php", {
            method: "POST",
            body: formData,
        })
        .then((response) => {
            if (response.ok) {
            return response.text();
            } else {
            console.error("Что-то пошло не так" + response.status)
            }
        })
        .then((result) => {
            if (result == 'ok') {
                modalSuccess();
                resolve();
            } else {
                modalErrore();
            }        
        });
    }).then(() => loadGallery())
};
loadGallery();

//----------Function Aside Menu---------------------------------------------------------
//------Кнопка Вся галерея-------------------------------------
let btnGallery = document.querySelector('.editor-gallery');
    btnGallery.addEventListener('click', function() {
        fetch(`/backend/pagination.php/?page=${currentPage + 1}`)
        .then((response) => {
        if (response.ok) return response.json();
        else console.error("Ошибка" + response.status);
        })
        .then((result) => {
            galleryContainer.innerHTML = '';
            createPhoto(result)
        });
        btnGallery.disabled = true;
        bntFavorite.disabled = false;
        linkContainer.style.display = '';
        document.querySelector('.aside-editor').style.display = '';
    });

//------Кнопка Редактировать------------------------------------- 
let btnEditor = document.querySelector('.editor-button');
    btnEditor.addEventListener('input', function () {      
        if (btnEditor.checked) {
            btnEditor.value = 'on';
        } else btnEditor.value = 'off';
        localStorage.setItem('editor', btnEditor.value);
        getEditor();  
    });

function getEditor() {
    let btnDeletePhotos = document.querySelectorAll('.deletePhoto');
    if (localStorage.getItem('editor') == 'on') {
        btnEditor.checked = true;
        btnDeletePhotos.forEach(btn => {
            btn.style.display = 'block';
        });
    } else {
        btnDeletePhotos.forEach(btn => {
            btn.style.display = 'none';
        });
    }
};

//------Кнопка Избранное-------------------------------------------
let bntFavorite = document.querySelector('.editor-favorite');
    bntFavorite.addEventListener('click', function (e) {
        getFavorite();
        btnGallery.disabled = false;
        bntFavorite.disabled = true;
        linkContainer.style.display = 'none';
        document.querySelector('.aside-editor').style.display = 'none';
        localStorage.setItem('editor', 'off');
        btnEditor.checked = false;
        getEditor();  
    });

//------Загрузка избранного----------------------------------------
function getFavorite() {
    galleryContainer.innerHTML = '';
    fetch('/backend/getFavorite.php') 
        .then((response) => {
            if(response.ok) return response.json();
            else console.error("Ошибка" + response.status);
        })
        .then((result) => createPhoto(result));
};
//----------------------------------------------------------------------------
//-----------Modal Windows----------------------------------------------------

function showLike(){
    document.querySelector('.modal-like').classList.add('show-modal--like');
    setTimeout(() => {
        document.querySelector('.modal-like').classList.remove('show-modal--like');
    }, 1000);
};

function modalSuccess() {    
    let successMessage = document.querySelector('.madal-success');
    successMessage.classList.add('show-modal--success')
        setTimeout(() => {
            successMessage.classList.remove('show-modal--success');
        }, 3000);
};

function modalErrore() {
    let erroreMessage = document.querySelector('.madal-errore');
    erroreMessage.classList.add('show-modal--errore')
    setTimeout(() => {
        erroreMessage.classList.remove('show-modal--errore');
    }, 3000);
};

//----------------------------------------------------------------------------
//  Управление слайдерами

function changeBlur () {
    let img = document.querySelector('.effect-image');
    function onMouseMove (evt) {
        evt.preventDefault();  
    let start = evt.clientX,
        shift = start - evt.clientX,
        startMove = start - shift - sliderBlur.getBoundingClientRect().left,
        endMove = sliderBlur.offsetWidth - thumbBlur.offsetWidth;

    if (startMove < 0) {
        startMove = 0;
    }
    if (startMove > endMove) {
        startMove = endMove;
    }   
        blurFilter = (((startMove * 100)/300).toFixed())/5 + 'px';
        sepiaFilter = 0;
        hueRotateFilter = 0;
        thumbBlur.style.cssText = `
            transition: none;
            left: ${startMove}px;
        `;

        thumbSepia.style.cssText = styleThumb;
        thumbHueRotate.style.cssText = styleThumb; 
        img.style.cssText = `
            filter: blur(${blurFilter});
        `;
    }
    function onMouseUp (evt) {
        evt.preventDefault();
    
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }; 
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
};

//----------------------------------------------------------------

function changeSepia () {
    let img = document.querySelector('.effect-image');
    function onMouseMove (evt) {
        evt.preventDefault();  
    let start = evt.clientX,
        shift = start - evt.clientX,
        startMove = start - shift - sliderSepia.getBoundingClientRect().left,
        endMove = sliderSepia.offsetWidth - thumbSepia.offsetWidth;

    if (startMove < 0) {
        startMove = 0;
    }
    if (startMove > endMove) {
        startMove = endMove;
    } 
        sepiaFilter = (((startMove * 100)/(sliderSepia.offsetWidth - 14)).toFixed()) + '%';
        blurFilter = 0;
        hueRotateFilter = 0;
        thumbSepia.style.cssText = `
            transition: none;
            left: ${startMove}px;
        `;  
        thumbHueRotate.style.cssText = styleThumb;  
        thumbBlur.style.cssText = styleThumb;
        img.style.cssText = `
            filter: sepia(${sepiaFilter});
        ` 

    }
    function onMouseUp (evt) {
        evt.preventDefault();
    
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }; 
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
};

//--------------------------------------------------------------------

function changeHueRotate () {
    let img = document.querySelector('.effect-image');
    function onMouseMove (evt) {
        evt.preventDefault();  
    let start = evt.clientX,
        shift = start - evt.clientX,
        startMove = start - shift - sliderHueRotate.getBoundingClientRect().left,
        endMove = sliderHueRotate.offsetWidth - thumbHueRotate.offsetWidth;

    if (startMove < 0) {
        startMove = 0;
    }
    if (startMove > endMove) {
        startMove = endMove;
    } 
        hueRotateFilter = (((startMove * 100)/300).toFixed()) * 5 + 'deg';
        sepiaFilter = 0;
        blurFilter = 0;
        thumbHueRotate.style.cssText = `
            transition: none;
            left: ${startMove}px;
        `; 
        thumbSepia.style.cssText = styleThumb; 
        thumbBlur.style.cssText = styleThumb;
        img.style.cssText = `
        filter: hue-rotate(${hueRotateFilter});
    ` 
    }
    function onMouseUp (evt) {
        evt.preventDefault();
    
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }; 
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
};

};

export {FotoFilter};
