import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

// Future scene effects must supply semantic content as their fallback.
export class EnhancementBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error('Garden enhancement failed', error, info.componentStack); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}
