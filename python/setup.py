#!/usr/bin/env python

"""The setup script."""

from setuptools import setup

setup(
    name='mi-script',
    python_requires=">=3.6",
    version='1.0.0',
    scripts=['spacememo.py'],
    author='opensourceducation',
    author_email='githubpersonalfor@gmail.com',
    description='A python/javascript nanolibrary for apply the “space memo repetition” in learning purposes apps',
    long_description='Ideal for quizzes, micro learning, and practical exercises what requires domain. Repeat the information for the optimal learning process of the user ',
    long_description_content_type='text/markdown',
    url='https://github.com/opensourceducation',
    license='MIT license',
    classifiers=[
        'Programming Language :: Python :: 3',
        'Intended Audience :: Education'
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
    ])
