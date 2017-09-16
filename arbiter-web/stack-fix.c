#include <dlfcn.h>
#include <pthread.h>
#include <stdio.h>

typedef int (*func_t)(pthread_t *thread, const pthread_attr_t *attr, void *(*start_routine)(void*), void *arg);

int pthread_create(pthread_t *thread, const pthread_attr_t *attr, void *(*start_routine)(void*), void *arg) {
	printf("xxx pthread_create override called\n");

	pthread_attr_t local;
	int used = 0, ret;

	if (!attr) {
		used = 1;
		pthread_attr_init(&local);
		attr = &local;
	}
	pthread_attr_setstacksize((void*)attr, 2 * 1024 * 1024); // 2 MB

	func_t orig = (func_t)dlsym(RTLD_NEXT, "pthread_create");

	ret = orig(thread, attr, start_routine, arg);

	if (used) {
		pthread_attr_destroy(&local);
	}

	return ret;
}