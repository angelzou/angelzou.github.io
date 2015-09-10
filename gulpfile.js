var spawn = require('child_process').spawn,
	gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	less = require('gulp-less'),
	notify = require('gulp-notify'),
	jshint = require('gulp-jshint'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	minifycss = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	clean = require('gulp-clean'),
	browserSync = require('browser-sync');


// 异步运行Jekyll Build
gulp.task('jekyll', function() {
	//browserSync.notify('Building Jekyll');
	var jekyll = spawn('jekyll.bat', ['build'], {stdio: 'inherit'});
        jekyll.on('exit', function (code) {
        console.log('-- Finished Jekyll Build --');
    });
});

gulp.task('jekyll-rebuild', ['jekyll'], function () {
    browserSync.reload();
});

// 启动静态文件服务器
gulp.task('browser-sync', ['jekyll'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        host: "localhost"
    });
});

// 合并压缩JavaScript文件
gulp.task('scripts', function() {
	return gulp.src('./src/js/*.js')
			.pipe(jshint())
			.pipe(concat('all.js'))
			.pipe(gulp.dest('./assets/js'))
			.pipe(uglify())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('./assets/js'))
			.pipe(gulp.dest('./_site/assets/js'))
			.pipe(browserSync.reload({stream:true}))
			.pipe(notify({message: 'scripts task complete!'}));
});
// 解析less，压缩css
gulp.task('styles', function() {
	gulp.src('./src/less/*.less')
		.pipe(less())
		.pipe(gulp.dest('./src/css'))
		.pipe(minifycss())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./assets/css'))
		.pipe(gulp.dest('./_site/assets/css'))
		.pipe(browserSync.reload({stream:true}))
		.pipe(notify({message: 'styles task complete!'}));
});
// 压缩image
gulp.task('images', function(){
    return gulp.src('./src/img/**/*')
        .pipe(cache(imagemin({optimizationLevel: 5,progressive: true, interlaced: true })))
        .pipe(gulp.dest('./assets/img'))
        .pipe(gulp.dest('./_site/assets/img'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(notify({message: 'Images task complete'}));
});

gulp.task('clean', function(){
    return gulp.src(['./assets/css', './assets/js'], {read: false})
    	.pipe(clean());
});

gulp.task('watch', function() {
	gulp.watch('./src/js/*js', ['scripts']);
	gulp.watch('./src/less/*.less', ['styles']);
	gulp.watch('./src/img/**/*', ['images']);
	gulp.watch(['index.html', '_includes/*.html', '_layouts/*.html', '*.md', '_posts/*'], ['jekyll-rebuild']);
});


gulp.task('default', ['clean'], function(){
	gulp.start('scripts', 'styles', 'images', 'browser-sync', 'watch');
});
