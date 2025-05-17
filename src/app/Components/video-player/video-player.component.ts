import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { CourseData, Module, Topic, Video } from '../../Models/course-details';
import { CoursesService } from '../../Services/courses.service';
import { map, switchMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  imports: [CommonModule, NavbarComponent],
})
export class VideoPlayerComponent implements OnInit {
  courseId: string = '';
  moduleId: string = '';
  topicId: string = '';
  videoId: string = '';

  course?: CourseData;
  module?: Module;
  topic?: Topic;
  video?: Video;

  currentVideoList: Video[] = [];
  currentVideoIndex: number = 0;

  constructor(
    private location: Location,
    private coursesService: CoursesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => {
          this.courseId = params['courseId'];
          this.moduleId = params['moduleId'];
          this.topicId = params['topicId'];
          this.videoId = params['videoId'];
          return {
            courseId: this.courseId,
            moduleId: this.moduleId,
            topicId: this.topicId,
            videoId: this.videoId,
          };
        }),
        switchMap((params) => {
          return this.coursesService.getCourseDetails(params.courseId);
        }),
        tap((courseDetails) => {
          this.course = courseDetails;
          this.module = courseDetails.modules.find(
            (module) => module._id === this.moduleId
          );
          this.topic = this.module?.topics.find(
            (topic) => topic._id === this.topicId
          );
          this.video = this.topic?.videos.find(
            (video) => video._id === this.videoId
          );

          if (this.course && this.module && this.video && this.topic) {
            this.currentVideoList = this.module.topics.flatMap((x) => x.videos);
            this.currentVideoIndex = this.currentVideoList.findIndex(
              (v) => v._id === this.video?._id
            );
            this.videoPlayer.nativeElement.load();
          }
        })
      )
      .subscribe();
  }

  goToNextVideo() {
    if (this.currentVideoIndex < this.currentVideoList.length - 1) {
      this.currentVideoIndex++;
      this.navigateToVideo();
    }
  }

  goToPreviousVideo() {
    if (this.currentVideoIndex > 0) {
      this.currentVideoIndex--;
      this.navigateToVideo();
    }
  }

  private navigateToVideo() {
    this.video = this.currentVideoList[this.currentVideoIndex];
    this.videoId = this.currentVideoList[this.currentVideoIndex]._id;
    this.topic = this.module?.topics?.find((topic) =>
      topic.videos.find((video) => video._id === this.videoId) ? topic._id : ''
    );
    this.topicId = this.topic?._id || '';
    this.location.replaceState(
      `/courseExplanation/${this.courseId}/video-player/${this.moduleId}/${this.topicId}/${this.videoId}`
    );
    this.videoPlayer.nativeElement.load();
  }

  selectVideo(index: number) {
    this.currentVideoIndex = index;
    this.navigateToVideo();
  }

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  onVideoEnded() {
    if (this.course && this.video) {
      this.coursesService
        .updateVideoCompletionStatus(this.course?._id, this.video?._id)
        .pipe(
          tap(() => {
            this.video!.isCompleted = true;
          })
        )
        .subscribe();
    }
  }
}
