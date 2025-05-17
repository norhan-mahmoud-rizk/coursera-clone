import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { CourseData, Module, Topic, Video } from '../../Models/course-details';
import { CoursesService } from '../../Services/courses.service';
import { map, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  imports: [CommonModule, NavbarComponent, RouterModule],
})
export class VideoPlayerComponent implements OnInit, AfterViewChecked {
  courseId: string = '';
  moduleId: string = '';
  topicId: string = '';
  videoId: string = '';

  nextVideoRoute?: { route: string; queryParams: any };
  previousVideoRoute?: { route: string; queryParams: any };

  contentRoutingList: { route: string; queryParams: any }[] = [];
  currentContentIndex: number = 0;

  course?: CourseData;
  module?: Module;
  topic?: Topic;
  video?: Video;

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngAfterViewChecked(): void {
    this.videoPlayer.nativeElement.load();
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => {
          this.courseId = params['courseId'];
          this.moduleId = params['moduleId'];
          this.topicId = params['topicId'];
          return {
            courseId: this.courseId,
            moduleId: this.moduleId,
            topicId: this.topicId,
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
          this.contentRoutingList =
            this.module?.topics?.flatMap((topic) => {
              return topic.videos.map((video) => {
                return {
                  route: `/courseExplanation/${this.courseId}/video-player/${this.moduleId}/${topic._id}`,
                  queryParams: { videoId: video._id },
                };
              });
            }) || [];
        }),
        switchMap(() => this.route.queryParams),
        tap((queryParams) => {
          this.videoId = queryParams['videoId'];
          if (this.videoId) {
            this.video = this.topic?.videos.find(
              (video) => video._id === this.videoId
            );

            this.currentContentIndex = this.contentRoutingList.findIndex(
              (video) => video.queryParams['videoId'] == this.videoId
            );

            if (this.currentContentIndex === 0) {
              this.previousVideoRoute = undefined;
            } else if (this.currentContentIndex > 0) {
              this.previousVideoRoute =
                this.contentRoutingList[this.currentContentIndex - 1];
            }
            if (
              this.currentContentIndex ===
              this.contentRoutingList.length - 1
            ) {
              this.nextVideoRoute = undefined;
            } else if (
              this.currentContentIndex <
              this.contentRoutingList.length - 1
            ) {
              this.nextVideoRoute =
                this.contentRoutingList[this.currentContentIndex + 1];
            }
          }
        })
      )
      .subscribe();
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
